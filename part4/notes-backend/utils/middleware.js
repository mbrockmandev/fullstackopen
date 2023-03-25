const logger = require('./logger');

// logs HTTP requests
const requestLogger = (req, _, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
};

// handle unknown requests
const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

// handle errors -- incomplete
const errorHandler = (err, _, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed ID.' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
