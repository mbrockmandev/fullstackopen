const express = require('express');
const cors = require('cors');
const app = express();

// morgan config
const morgan = require('morgan');
morgan.token('req-body', (req) => JSON.stringify(req.body));
const morganFormat =
  ':method :url :status :res[content-length] - :response-time ms \n:req-body';
app.use(morgan(morganFormat));

// middleware
app.use(cors());
app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/info/', (req, res) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = now.toLocaleTimeString('en-US');

  const responseHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Info:</title>
    </head>
    <body>
      <h3>There are ${persons.length} contacts in the phonebook.</h3>
      <h3>The current time is: ${formattedDate} at ${formattedTime}</h3>
    </body>
  </html>
`;
  res.status(200).send(responseHtml);
});

// GET ALL persons
app.get('/api/persons/', (req, res) => {
  res.json(persons);
});

// GET BY ID
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => {
    console.log(person.id, typeof person.id, id, typeof id, person.id === id);
    return person.id === id;
  });
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// Helper to make new ID
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

// helper to find duplicate names
const isDuplicate = (name) => {
  return persons.map((person) => person.name).includes(name);
};

// POST NEW person
app.post('/api/persons', (req, res) => {
  const body = req.body;

  // Validate input
  if (!body.name) {
    return res.status(404).json({ error: 'Name Missing.' });
  } else if (!body.number) {
    return res.status(404).json({ error: 'Number Missing.' });
  } else if (isDuplicate(body.name)) {
    return res.status(409).json({ error: 'Duplicate Name.' });
  }

  const person = {
    name: body.name,
    number: body.number || false,
    id: generateId(),
  };

  persons = persons.concat(person);
  res.json(person);
});

// DELETE BY ID
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

// HANDLE UNKNOWN ROUTE
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
