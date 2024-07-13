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

  if(!title || title.length <= 0){
    emptyFields.push('title')
  }
  if(!description || description.length <= 0){
    emptyFields.push('description')
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill the required fields', emptyFields})
  }

  if(description.length <= 2){
    return res.status(400).json({error: 'Description must be more then 2 characters'})
  }

  if(title.length <= 2){
    return res.status(400).json({error: 'Title must be more then 2 characters'})
  }

  try {
    const user_id = req.user._id
    const note = await notesModel.create({title, description, user_id})

    res.status(201).json(note)
  } catch (error){
    return res.status(400).json(error.message)
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