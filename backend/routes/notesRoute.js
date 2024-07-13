const express = require('express');
const router = express.Router();
const {getAllNotes, getSingleNote, postNote, deleteNote, patchNote} = require('../controller/notesController')
const requireAuth = require('../middleware/requireAuth')

//middleware
router.use(requireAuth)

//GET ALL
router.get('/', getAllNotes);

//GET single
router.get('/:id', getSingleNote);

//POST
router.post('/', postNote);

//DELETE
router.delete('/:id', deleteNote);

//PATCH
router.patch('/:id', patchNote);

module.exports = router