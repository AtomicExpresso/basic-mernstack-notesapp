const express = require('express');
const router = express.Router();
const {getAllUsers, getSingleUser, updateSingleUser, postSingleUser, deleteSingleUser} = require('../controller/userController')

//GET ALL
router.get('/', getAllUsers)

//GET Single
router.get('/:id', getSingleUser)

//POST 
router.post('/', postSingleUser)

//PATCH
router.patch('/:id', updateSingleUser)

//DELETE
router.delete('/:id', deleteSingleUser)

module.exports = router