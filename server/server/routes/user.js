import express from 'express';
// controllers
import user from '../controllers/user.js';
import {userSchema} from "../models/User";
import {middleware as body} from 'bodymen'

const router = express.Router();
const {email, password, name, picture, role} = userSchema.tree

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/', token({required: true, roles: ['admin']}), user.onGetAllUsers)

router.post('/', body({email, password, name, picture, role}) , user.onCreateUser)

router.get('/:id', user.onGetUserById)

router.delete('/:id', user.onDeleteUserById)

export default router;
