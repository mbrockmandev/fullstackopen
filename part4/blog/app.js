const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
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
  logger.info('Connected to MongoDB');
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
