import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt"

// export const USER_TYPES = {
//   CONSUMER: "consumer",
//   SUPPORT: "support",
// };
export const roles = ['admin', 'support', 'consumer']

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    name: {
      type: String,
      index: true,
      trim: true
    },
    picture: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: roles,
      default: 'user'
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

/*
 * this will interpolate picture and name
 */
userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?=identicon`
  }

  if(!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1')
  }
  return email
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  this.password = await bcrypt.hash(this.password, rounds)
})

/**
 * @param {String} email
 * @param {String} password
 * @param {String} name
 * @param {String} role
 * @returns {Object} new user object created
 */
// userSchema.statics.createUser = async function (firstName, lastName, type) {
//   try {
//     const user = await this.create({ firstName, lastName, type });
//     return user;
//   } catch (error) {
//     throw error;
//   }
// }
//
// /**
//  * @param {String} id, user id
//  * @return {Object} User profile object
//  */
// userSchema.statics.getUserById = async function (id) {
//   try {
//     const user = await this.findOne({ _id: id });
//     if (!user) throw ({ error: 'No user with this id found' });
//     return user;
//   } catch (error) {
//     throw error;
//   }
// }
//
// /**
//  * @return {Array} List of all users
//  */
// userSchema.statics.getUsers = async function () {
//   try {
//     const users = await this.find();
//     return users;
//   } catch (error) {
//     throw error;
//   }
// }
//
// /**
//  * @param {Array} ids, string of user ids
//  * @return {Array of Objects} users list
//  */
// userSchema.statics.getUserByIds = async function (ids) {
//   try {
//     const users = await this.find({ _id: { $in: ids } });
//     return users;
//   } catch (error) {
//     throw error;
//   }
// }
//
// /**
//  * @param {String} id - id of user
//  * @return {Object} - details of action performed
//  */
// userSchema.statics.deleteByUserById = async function (id) {
//   try {
//     const result = await this.remove({ _id: id });
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

userSchema.statics = {
  roles
}

userSchema.methods = {
  view (full) {
    const view = {}
    let fields = ['id', 'name', 'picture']

    if (full) {
      fields = [...fields, 'email', 'createAt']
    }
    return view
  },

  authenticate(password) {
    return bcrypt.compare(password, this.password).then(valid => valid ? this : false)
  }
}

const model = mongoose.model('User', userSchema)

export const userSchema = model.schema
export default model
