const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed ID.' });
  }

  next(err);
};

module.exports = errorHandler;
