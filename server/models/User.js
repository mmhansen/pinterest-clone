import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import findOrCreate from 'mongoose-findOrCreate'

const User = new Schema ({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})


const noop = () => {}
const salt = 10

User.pre('save', function(done) {
  let user = this;
  bcrypt.genSalt(salt, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
      if (err) { return done(err); }
      user.password = hashedPassword;
      done();
    })
  })
})

User.methods.checkPassword = function(guess, done)  {
  bcrypt.compare(guess, this.password, function (err, isMatch) {
    if (err) { return done(err); }
    done(null, isMatch)
  })
}

User.plugin(findOrCreate)
export default mongoose.model('user', User)
