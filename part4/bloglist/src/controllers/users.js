const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { CustomError } = require('../utils/CustomError');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  const PASSWORD_MIN_LENGTH = 3;

  if (password === undefined || password.length === 0) {
    throw new CustomError('ValidationError', 'User validation failed: password: Path `password` is required.');
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    throw new CustomError('ValidationError', `User validation failed: password: Path \`password\` is shorter than the minimum allowed length (${PASSWORD_MIN_LENGTH}).`);
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0 });
  response.json(users);
});

module.exports = usersRouter;
