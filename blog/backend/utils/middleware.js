const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:', req.path);
  logger.info('Body:', req.body);
  logger.info('---');
  next();
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed ID.' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

const tokenExtractor = (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }

  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const tokenValidator = (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }

  const token = req.token;
  if (!token) {
    return res.status(401).json({ error: 'Missing Token' });
  }

  const decoded = jwt.verify(token, process.env.SECRET);
  if (!decoded.id) {
    return res.status(401).json({ error: 'Invalid Token' });
  }

  const { exp } = decoded;

  if (Date.now() >= exp * 1000) {
    const newToken = jwt.sign({ user: decoded.user }, process.env.SECRET, {
      expiresIn: '1h',
    });
    res.set('Authorization', newToken);
  }

  req.user = decoded.user;

  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  tokenValidator,
};
