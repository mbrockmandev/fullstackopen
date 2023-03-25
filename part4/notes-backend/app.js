const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware.js');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGO_URI);

const connectDb = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    logger.info('connected to MongoDB');
  } catch (err) {
    logger.error('error connecting to MongoDB:', err.message);
  }
};

connectDb();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use('api/notes', notesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
