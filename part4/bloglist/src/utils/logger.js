// eslint-disable-next-line no-console
const info = (...params) => !(process.env.NODE_ENV === 'test') && console.info(...params);

// eslint-disable-next-line no-console
const error = (...params) => console.error(...params);

module.exports = {
  info,
  error,
};
