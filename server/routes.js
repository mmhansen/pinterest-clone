import express, { Router } from 'express'
import passport from 'passport'
//locals
import passportStrategies from './config/passport'
import { login, register } from './controllers/authentication'
import errors from './controllers/error'
import {
  createPin,
  deletePin,
  updatePin,
  fetchUserPins,
  likePin,
  sharePin
} from './controllers/PinController'



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
  apiRoutes.post('/register', register)
  // Pin routing
  const pinRouter = Router();
  pinRouter.post('/create', createPin)
  pinRouter.delete('/:pin_id', deletePin)
  pinRouter.put('/:pin_id', updatePin)
  pinRouter.get('/:user_id', fetchUserPins)
  pinRouter.put('/like/:pin_id', likePin)
  pinRouter.put('/share/:pin_id/:user_id', sharePin)
  apiRoutes.use('/pins', pinRouter)

  // errors
  errors(app)
  //connect api sub router to server
  app.use('/api', apiRoutes)
}
