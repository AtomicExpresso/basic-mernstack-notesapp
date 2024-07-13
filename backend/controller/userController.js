const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  //takes three arguments, first is id, second is secret, third is how long it takes for the token to expire
  return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}

//Signup user
const signupUser = async (req, res) => {
  const {username, email, password} = req.body

  try {
    const user = await userModel.signUp(username, email, password)

    //create token for session
    const token = createToken(user._id)

    res.status(200).json({username, email, password, token})
  } catch (error) {
    res.status(400).json({error: error.message}) //uses the error message from the model
  }
}

//Login user
const loginUser = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await userModel.logIn(username, password)

    //create token for session
    const token = createToken(user._id)

    res.status(200).json({username, token})
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = {signupUser, loginUser}