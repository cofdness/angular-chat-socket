// utils
import makeValidation from '@withvoid/make-validation';
// models
import UserModel, { roles } from '../models/User.js';
import {success, notSuccess} from "../service/response";

export default {
  onGetAllUsers: async ({querymen: {query, select, cursor}}, res, next) => {
    try {
      const users = await UserModel.find(query, select, cursor).map(user => user.view());
      success(res, users)
    } catch (error) {
      next(error)
    }
  },
  onGetUserById: async ({params}, res, next) => {
    try {
      const user = await UserModel.findById(params.id);
      success(res, user)
    } catch (error) {
      next(error)
    }
  },
  onCreateUser: async ({bodymen: {body}}, res, next) => {
    try {
      const user = await UserModel.create(body);
      success(res, user)
    } catch (error) {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(error)
      }
    }
  },
  onDeleteUserById: async ({params}, res, next) => {
    try {
      const user = await UserModel.findById(params.id);
      await user.remove()
      success(res, {
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`
      })
    } catch (error) {
      next(error)
    }
  },
}
