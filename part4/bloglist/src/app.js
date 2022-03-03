const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

const { MONGODB_URI } = require('./config');

const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require('./utils/middleware');

const blogsRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');

const app = express();

mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/blogs', tokenExtractor, blogsRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;
