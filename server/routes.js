import express, { Router } from 'express'
import passport from 'passport'
//locals
import passportStrategies from './config/passport'
import { login, register } from './controllers/authentication'
import errors from './controller/error'


export default function (app) {
  const apiRoutes = Router();
  const options = {
    failureRedirect: '/login',
    session:  false,
    scope: ['email']
  }
  const facebookAuth = passport.authenticate('facebook', options)
  const localAuth = passport.authenticate('local', options)
  // facebook
  apiRoutes.get('/facebook', facebookAuth)
  apiRoutes.get('/facebook/callback', facebookAuth, login);
  //Locals
  apiRoutes.post('/login', localAuth, login)
  apiRoutes .post('/register', register)
  // errors
  errors(app)
  //connect api sub router to server
  app.use('/api', apiRoutes)
}
