const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || '8080';
const morgan = require('morgan');

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

// GET TEST
app.get('/', (req, res) => {
  res.send('<h1>Notes Full Stack!</h1>');
});

// GET ALL NOTES
app.get('/api/notes/', (req, res) => {
  res.json(notes);
});

// GET BY ID
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => {
    return note.id === id;
  });
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

// Helper to make new ID
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

// POST NEW NOTE
app.post('/api/notes', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(404).json({ error: 'Content Missing.' });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  res.json(note);
});

// PUT BY ID
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

// DELETE BY ID
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
