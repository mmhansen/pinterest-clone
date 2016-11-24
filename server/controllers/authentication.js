import config from '../config/config'
import jwt from 'jwt-simple'
import User from '../models/User'

const makeToken = (id) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: id, iat: timestamp }, config().secret)
}
// login control
export function login (req, res, next) {
  let { _id } = req.user
  // res.okay({
  //   token: makeToken(_id)
  // })
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  // const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
  const token = makeToken(_id)
  res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  res.redirect('/')
}
// register control
export function register (req, res, next) {
  let { email, password } = req.body
  User.findOne({email}, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) { return res.conflict(); }
    let newUser = new User({ email, password })
    newUser.save((err, user) => {
      if (err) { return next(err); }
      // return user with their token
      res.created({
        token: makeToken(user._id)
      })
    })
  })
}
