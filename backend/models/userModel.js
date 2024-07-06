const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
})

userSchema.mongoose.statics.signUp = async function(username, email, password) {
  if(!email || !password || !username){
    throw new Error('Please fill in the required fields')
  }

  if(!validator.isEmail(email)){
    throw new Error('Please put a valid email address')
  }

  if(!validator.isStrongPassword(password)){
    throw new Error('Please put a stronger password')
  }

  //Check DB if user with same email exists
  const exists = await this.findOne({email})
  const checkUser = await this.findOne({username})

  if(exists){
    throw new Error('Someone already made an account with that email')
  }
  if(checkUser){
    throw new Error('Username isnt avaible')
  }

  //Hash password
  const salt = bcrypt.genSalt(10); //generate salt, adds a random string of characters to the password (Adds an extra layer of security)
  const hash = bcrypt.hash(password, salt); //Generate hashed password

  const user = await this.create({username, email, password: hash});

  return user
}

//login method
userSchema.mongoose.statics.logIn = async function (username, email, password) {
  if(!email || !password || !username){
    throw new Error('Please fill in the required fields')
  }

  const user = this.findOne({email})
  const userName = this.findOne({username})

  if(!user){
    throw new Error('Incorrect email')
  }

  if(!userName){
    throw new Error('Incorrect username')
  }

  const matchPassword = bcrypt.compare(password, user.password)

  if(!matchPassword){
    throw new Error('Incorrect password')
  }

  return user
}

module.exports = ('user', userSchema)