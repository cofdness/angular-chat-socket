import pubsub from "../../utils/pubsub";
import userModel from "../../models/User";
import {sign} from "../../service/jwt";
import {success} from "../../service/response";

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
      return userModel.find(args.id)
    },
    users: (parent, args, context, info) => {
      return userModel.find()
    },
    auth: async (parent, { input }, context, info) => {
      console.log('auth call')
    }
  },
  Mutation: {
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
