const logger = require('./logger');
const jwt = require('jsonwebtoken');

// logs HTTP requests
const requestLogger = (req, _, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

// handle errors -- incomplete
const errorHandler = (err, _, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed ID.' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token Expired',
    });
  }

  next(err);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
};
