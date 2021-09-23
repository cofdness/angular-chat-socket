import { ExtractJwt } from 'passport-jwt'

const authGraphql = (req, res, next) => {
  req.isAuthenticated = false
  const authorizationHeader = req.headers.authorization
  const token = ExtractJwt.fromAuthHeaderAsBearerToken('Bearer')(req)
  console.log(token)
  next()
}
export default authGraphql
