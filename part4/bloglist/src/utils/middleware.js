const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const ERROR_HANDLER = {
  AuthenticationError: (response, error) => {
    response.status(401).json({ error: error.message });
  },

  AuthorizationError: (response, error) => {
    response.status(403).json({ error: error.message });
  },

  CastError: (response) => {
    response.status(400).send({ error: 'malformatted id' });
  },

  JsonWebTokenError: (response) => {
    response.status(401).json({ error: 'token missing or invalid' });
  },

  SyntaxError: (response, error) => {
    response.status(400).json({ error: error.message });
  },

  ValidationError: (response, error) => {
    response.status(400).json({ error: error.message });
  },
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.name, error.message);
  const handler = ERROR_HANDLER[error.name];
  if (handler) handler(response, error);
  next(error);
};

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (!authorization) return null;
  const [scheme, token] = authorization.split(' ');
  return (scheme.toLowerCase() === 'bearer')
    ? token
    : null;
};

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request);
  next();
};

module.exports = {
  errorHandler,
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
};
