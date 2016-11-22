// dependencies
import express from 'express';
import mongoose from 'mongoose';
import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import responses from './responses'
import cors from 'cors'
// locals
import route from './routes'
import getConfig from './config/config'
// initialize
const app = express();
const config = getConfig();
// connect to DB

mongoose.connect(`mongodb://${config.database.host}/${config.database.name}`)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => (console.log(`db connection open on ${config.database.name}`)))

// middleware
const options = {
   origin: 'http://localhost:8080/',
}
app.use(cors(options))
// logger
app.use(logger('dev'))
// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// passport
app.use(passport.initialize());
// responses
app.use(responses)
/*
 * Define routing for server requests
 */
route(app)
/*
 * Start server listening on port from config
 */
app.listen(process.env.PORT || config.port)
console.log(`Server listening on http://localhost:${config.port}`)
