const express = require('express');
const app = express();
const cors = require('cors');
const Note = require('./models/note');
const errorHandler = require('./utils/errorHandler');
const requestLogger = require('./utils/requestLogger');

// middleware
app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.use(errorHandler);

// GET all notes
app.get('/api/notes/', (_, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

// GET by id
app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(400)
        .json({ error: `${req.params.id} is the incorrect format for an id.` });
    });
});

// POST new note
app.post('/api/notes', (req, res, next) => {
  const body = req.body;

  if (!body.content) {
    return res.status(404).json({ error: 'Content Missing.' });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((err) => {
      next(err);
    });
});

// PUT by id
app.put('/api/notes/:id', (req, res, next) => {
  const { content, important } = req.body;

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((err) => next(err));
});

// DELETE by id
app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

module.exports = app;
