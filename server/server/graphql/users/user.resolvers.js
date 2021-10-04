import pubsub from "../../utils/pubsub";
import userSchema, {roles, schema} from "../../models/User";
import jwt from "jsonwebtoken";
import {Schema} from "bodymen";
import { jwtSecret } from '../../config'
import { authCheck, authType } from "../../middlewares/auth-check";

const event = {
  newUserEvent: 'new_user_event'
}
const userType = {
  admin: 'admin',
  support: 'support',
  customer: 'customer'
}

const userResolvers = {
  Query: {
    user: (parent, args, context, info) => {
      authCheck([{type: authType.AUTH}], context)
      return userSchema.find(args.id)
    },
    users: (parent, args, context, info) => {
      authCheck([{type: authType.AUTH}], context)
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
      if (input.role === userType.admin ) {
        // we need master key to create role admin
        authCheck([{type: authType.MASTER_KEY}], context)
      }
      try {
        const user = await userSchema.create(input)
        const token = jwt.sign(user.id, jwtSecret)
        await pubsub.publish(event.newUserEvent, {newUser: {token, user}})
        const {name, email, password, role} = user
        return {name, email, password, role}

      } catch (err) {
        throw new Error('something wrong when create user')
      }
    },
    updateUser: async (root, { input }, context, info) => {

    },
    deleteUser: async (root, { input }, context, info) => {
      console.log(input)
    }

  }
}
export default userResolvers
