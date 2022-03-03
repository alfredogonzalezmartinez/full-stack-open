class CustomError extends Error {
  constructor(name, message, options) {
    super(message, options);
    this.name = name;
  }
}

module.exports = { CustomError };
