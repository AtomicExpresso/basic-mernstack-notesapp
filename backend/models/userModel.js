const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
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
}, {timestamps: true})

userSchema.statics.signUp = async function(username, email, password) {
  if(!username || !email || !password){
    throw new Error('Please fill in the required fields')
  }

  if(!validator.isEmail(email)){
    throw new Error('Please put a valid email address')
  }

  if(!validator.isStrongPassword(password)){
    throw new Error('Please put a stronger password')
  }

  //Check DB if user with same email exists
  const exists = await this.findOne({email});
  const checkUser = await this.findOne({username});

  const newPassword = password.toString(); //Convert password to string

  if(exists){
    throw new Error('Someone already made an account with that email')
  }
  if(checkUser){
    throw new Error('Username isnt avaible')
  }

  //Hash password
  const salt = await bcrypt.genSalt(10); //generate salt, adds a random string of characters to the password (Adds an extra layer of security)
  const hash = await bcrypt.hash(newPassword, salt); //Generate hashed password

  const user = await this.create({username, email, password: hash});

  return user
}

//login method
userSchema.statics.logIn = async function (username, password) {
  if(!password || !username){
    throw new Error('Please fill in the required fields')
  }

  const user = await this.findOne({username})

  if(!user){
    throw new Error('Incorrect username')
  }
  if(!user.password){
    throw new Error('Incorrect password')
  }

  const matchPassword = await bcrypt.compare(password, user.password)

  if(!matchPassword){
    throw new Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('userModel', userSchema)