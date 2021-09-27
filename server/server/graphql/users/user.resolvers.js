import pubsub from "../../utils/pubsub";
import userSchema, {schema} from "../../models/User";
import jwt from "jsonwebtoken";
import {Schema} from "bodymen";
import { jwtSecret } from '../../config'

const event = {
  newUserEvent: 'new_user_event'
}

const userResolvers = {
  roles: {
    admin: 'admin',
    support: 'support',
    customer: 'customer'
  },
  Query: {
    user: (parent, args, context, info) => {
      return userSchema.find(args.id)
    },
    users: (parent, args, context, info) => {
      return userSchema.find()
    }

  },
  Mutation: {
    login: async (parent, { input }, context, info) => {
      const tempUser = new Schema({ email: schema.tree.email, password: schema.tree.password})
      const {email, password} = input

      tempUser.validate({ email, password}, err => {
        if (err) return { err }
      })
      const user = await userSchema.findOne({email})
      try {
        let authUser = await user.authenticate(password)
        if (authUser) {
          const token = jwt.sign(authUser.id, jwtSecret)
          return { token }
        } else {
          throw new Error('wrong password')
        }

      } catch (err) {
        return { err }
      }



    },
    createUser: async (root, { input }, context, info) => {
      try {
        const user = await userModel.create(input)
        const token = sign(user.id)
        await pubsub.publish(event.newUserEvent, {newUser: {token, user}})
        return { token, user }

      } catch (err) {
        throw Error('something wrong create user')
      }
    },
    updateUser: async (root, { input }, context, info) => {
      console.log(root)
      console.log(input)
      console.log(context)
      console.log(info)
    },
    deleteUser: async (root, { input }, context, info) => {
      console.log(input)
    }

  }
}
export default userResolvers
