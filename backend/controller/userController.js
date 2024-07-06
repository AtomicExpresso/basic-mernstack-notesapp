const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  res.status(200).json({msg: 'Got all users'})
}

const getSingleUser = async (req, res) => {
  res.status(200).json({msg: 'Get single'})
}

const updateSingleUser = async (req, res) => {
  res.status(200).json({msg: 'Update'})
}

const postSingleUser = async (req, res) => {
  res.status(200).json({msg: 'Posted'})
}

const deleteSingleUser = async (req, res) => {
  res.status(200).json({msg: 'Delete'})
}

module.exports = {getAllUsers, getSingleUser, updateSingleUser, postSingleUser, deleteSingleUser}