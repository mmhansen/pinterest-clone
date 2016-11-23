import passport from 'passport'
// strategies
import local from 'passport-local'
import facebook from 'passport-facebook'
import { ExtractJwt, Strategy } from 'passport-jwt'
// locals
import config from './config'
import User from '../models/User'
/*
 * Local Strategy
 */
passport.use(new local({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); } // catch db err
    if(!user) { return done(null, false) } // couldn't find user by email
    // compare passwords
    user.checkPassword(password, (err, isMatch) => {
      if (err) { return done(err); } // catch func err
      if (!isMatch) { return done(null, false) } // passwords don't match
      // all good, forward on the user
      return done(null, user)
    })
  })
}))
/*
 * Facebook Strategy
 */
passport.use(new facebook({
    clientID: config().facebook.id,
    clientSecret: config().facebook.secret,
    callbackURL: 'http://localhost:3000/api/facebook/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ email: profile.email }, (err, user) => {
      if (err) { return done(err); }
      done(null, user)
    })
  }
));


/*
 * Jwt Strategy
 */
passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config().secret
}, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if(err) { return done(err, false); } // catch db err
    if(!user) { return done(null, false); } // user doesn't exist with given ID
    // all good -> return user
    return done(null, user)
  })}
))
