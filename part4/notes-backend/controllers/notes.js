const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (req, res) => {
  try {
    const notes = await Note.find({});
    console.log(notes);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

notesRouter.post('/', async (req, res, next) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  try {
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

notesRouter.put('/:id', async (req, res, next) => {
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {
      new: true,
    });
    res.status(200).json(updatedNote);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = notesRouter;
