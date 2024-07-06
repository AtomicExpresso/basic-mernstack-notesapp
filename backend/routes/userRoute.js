const express = require('express');
const router = express.Router();
const {signupUser, loginUser} = require('../controller/userController')

// login router
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)


module.exports = router