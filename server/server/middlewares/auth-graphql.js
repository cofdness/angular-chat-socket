import { ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config'
import userSchema from '../models/User'

const authGraphql = async (req, res, next) => {
  req.isAuthenticated = false
  const authorizationHeader = req.headers.authorization
  if (!authorizationHeader) {
    // login request and unauthorized resource go here
    return next()
  }
  const token = ExtractJwt.fromAuthHeaderAsBearerToken('Bearer')(req)
  const userID = jwt.verify(token, jwtSecret)
  const user = await userSchema.findById(userID)
  if (user) {
    req.isAuthenticated = true
    req.user = user
    return next()
  } else {
    return res.status(401).end()
  }

}
export default authGraphql
