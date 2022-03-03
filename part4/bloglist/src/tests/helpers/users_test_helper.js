const bcrypt = require('bcrypt');
const User = require('../../models/User');

const initialUser = {
  username: 'root',
  name: 'Superuser',
  password: 'salainen',
};

const userToAdd = {
  username: 'mluukkai',
  name: 'Matti Luukkainen',
  password: 'salainen',
};

const addUser = async ({ username, name, password }) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await new User({ username, name, passwordHash });
  await user.save();
};

const setUpUsersDbInicialState = async () => {
  await User.deleteMany({});
  await addUser(initialUser);
};

const getAllUsersInDb = async () => {
  const blogs = await User.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  addUser,
  getAllUsersInDb,
  initialUser,
  setUpUsersDbInicialState,
  userToAdd,
};
