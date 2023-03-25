const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || '8080';
const app = express();
const Person = require('./models/person');

// logs HTTP requests
const requestLogger = (req, _, next) => {
  console.log(
    '=====\nMethod:',
    req.method,
    'Path:  ',
    req.path,
    'Body:  ',
    req.body,
    '\n=====',
  );
  next();
};

// middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/info/', (_, res) => {
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

// GET ALL people
app.get('/api/people/', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

// GET BY ID
app.get('/api/people/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        console.log('got to this point!');
        res.status(404).end();
      }
    })
    .catch((error) => {
      res.json({ error: error.message }).status(500).end();
    });
});

// POST NEW person
app.post('/api/people', (req, res) => {
  const body = req.body;

  // Validate input
  if (!body.name) {
    return res.status(404).json({ error: 'Name Missing.' });
  } else if (!body.number) {
    return res.status(404).json({ error: 'Number Missing.' });
  }
  // add checking for duplicates?

  const person = new Person({
    name: body.name,
    number: body.number || false,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

// PUT by ID
app.put('/api/people/:id', (req, res) => {
  const body = req.body;

  // Validate input
  if (!body.name) {
    return res.status(404).json({ error: 'Name Missing.' });
  } else if (!body.number) {
    return res.status(404).json({ error: 'Number Missing.' });
  }

  Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedPerson) => {
      res.status(200).json(updatedPerson);
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
});

// DELETE BY ID
app.delete('/api/people/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((person) => {
      res.status(204).json(person);
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
});

// HANDLE UNKNOWN ROUTE
const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
