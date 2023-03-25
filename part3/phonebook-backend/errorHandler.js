const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((error) => error.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return res.status(400).json({ message });
  }
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    const message = 'Invalid ID';
    return res.status(400).json({ message });
  }
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err.stack);
  res.status(500).send('Internal server error');

  next(err);
};

module.exports = errorHandler;
