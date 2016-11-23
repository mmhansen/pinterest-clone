import express, { Router } from 'express'
import passport from 'passport'
import path from 'path'
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
  const twitterAuth = passport.authenticate('twitter', options)
  const localAuth = passport.authenticate('local', options)
  const jwtAuth = passport.authenticate('jwt', {session: false})
  // facebook
  apiRoutes.get('/facebook', facebookAuth)
  apiRoutes.get('/facebook/callback', facebookAuth, login);
  apiRoutes.get('/twitter', twitterAuth)
  apiRoutes.get('/twitter/callback', twitterAuth, login)
  //Locals
  apiRoutes.post('/login', localAuth, login)
  apiRoutes.post('/register', register)
  // Pin routing
  const pinRouter = Router();
  pinRouter.post('/create', jwtAuth, createPin)
  pinRouter.delete('/:pin_id', jwtAuth, deletePin)
  pinRouter.put('/:pin_id', jwtAuth, updatePin)
  pinRouter.get('/:user_id', fetchUserPins)
  pinRouter.put('/like/:pin_id', jwtAuth, likePin)
  pinRouter.put('/share/:pin_id/:user_id', jwtAuth, sharePin)
  apiRoutes.use('/pins', pinRouter)

  //connect api sub router to server
  app.use('/api', apiRoutes)
  app.get('*', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public'))
  })
  // errors
  errors(app)
}
