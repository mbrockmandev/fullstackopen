const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || '8080';
const app = express();
const Person = require('./models/person');
const errorHandler = require('./errorHandler');

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
app.use(errorHandler);

app.get('/info/', async (_, res, next) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = now.toLocaleTimeString('en-US');

  try {
    const count = await Person.countDocuments({});
    res.json({
      count: `There are ${count} people in the phonebook.`,
      formattedDate,
      formattedTime,
    });
  } catch (err) {
    next(err);
  }
});

// GET ALL people
app.get('/api/people/', (req, res, next) => {
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
    .catch((err) => next(err));
});

// POST NEW person
app.post('/api/people', (req, res, next) => {
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

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => next(err));
});

// PUT by ID
app.put('/api/people/:id', (req, res, next) => {
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
    .catch((err) => next(err));
});

// DELETE BY ID
app.delete('/api/people/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((person) => {
      res.status(204).json(person);
    })
    .catch((err) => next(err));
});

// HANDLE UNKNOWN ROUTE
const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
