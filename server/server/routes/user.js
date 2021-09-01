import express from 'express';
// controllers
import user from '../controllers/user.js';
import {userSchema} from "../models/User";

const router = express.Router();
const {email, password, name, picture, role} = userSchema.tree

router
  .get('/', user.onGetAllUsers)
  .post('/', user.onCreateUser)
  .get('/:id', user.onGetUserById)
  .delete('/:id', user.onDeleteUserById)

export default router;
