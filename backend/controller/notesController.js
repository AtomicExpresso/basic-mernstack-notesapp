const mongoose = require('mongoose');
const notesModel = require('../models/notesModel');

const getAllNotes = async (req, res) => {
  const user_id = req.user._id
  const notes = await notesModel.find({user_id}).sort({createdAt: -1})

  res.status(200).json(notes)
}

const getSingleNote = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No item found with that id'})
  }

  const note = await notesModel.findById(id);

  if(!note){
    return res.status(404).json({error: 'No item found with that id'})
  }

  res.status(200).json(note)
}

const postNote = async (req, res) => {
  const {title, description} = req.body

  let emptyFields = [];

  if(!title){
    emptyFields.push('title')
  }
  if(!description){
    emptyFields.push('description')
  }

  if(emptyFields.length > 0){
    res.status(400).json({msg: 'Please fill the required fields', emptyFields})
  }

  try {
    const user_id = req.user._id
    const note = await notesModel.create({title, description, user_id})

    res.status(201).json(note)
  } catch (error){
    res.status(400).json(error.message)
  }
}

const deleteNote = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No item found with that id'})
  }

  const note = await notesModel.findOneAndDelete({_id: id})

  if(!note){
    res.status(400).json({error: 'Cant delete note'})
  }

  res.status(200).json(note)
}

const patchNote = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'no note found by that id'})
  }

  const note = await notesModel.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if(!note){
    return res.status(400).json({error: 'Note cant be updated'})
  }

  res.status(200).json(note)
}

module.exports = {getAllNotes, getSingleNote, postNote, deleteNote, patchNote}