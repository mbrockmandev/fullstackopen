const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('Connecting to', config.MONGO_URI);

const connectDb = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
  } catch (err) {
    logger.error('error connecting to MongoDB:', err.message);
  }
};

connectDb();

mongoose.connection.once('open', () => {
  console.log(
    `Connected to ${config.MONGO_URI} and server is running on port ${config.PORT}`,
  );
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.requestLogger);
app.use(middleware.errorHandler);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.tokenExtractor);
app.use(middleware.tokenValidator);
app.use('/api/blogs', blogsRouter);

module.exports = app;
