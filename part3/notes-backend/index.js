const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || '8080';
const morgan = require('morgan');
const mongoose = require('mongoose');
const url = process.env.MONGO_URI;
const Note = require('./models/note');

// logs HTTP requests
const requestLogger = (req, _, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
};

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(morgan('short'));
app.use(requestLogger);

// static data
let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

// GET all notes
app.get('/api/notes/', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

// GET by id
app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      res.json(note);
    })
    .catch((error) => {
      res.json({ error: error.message }).status(404);
    });
});

// POST new note
app.post('/api/notes', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(404).json({ error: 'Content Missing.' });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

// PUT by id
app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex !== -1) {
    notes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          important: !note.important,
        };
      } else {
        return note;
      }
    });
    const updatedNote = notes.find((note) => note.id === id);
    res.status(200).json(updatedNote);
  } else {
    res.status(204).end();
  }
});

// DELETE by id
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('ENV PORT:', process.env.PORT);
  console.log('MONGO URI:', url);
  console.log(`Server running on port ${PORT}`);
});
