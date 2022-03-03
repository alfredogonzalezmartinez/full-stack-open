const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const {
  initialUser,
  userToAdd,
  setUpUsersDbInicialState,
  getAllUsersInDb,
} = require('./helpers/users_test_helper');

const api = supertest(app);

beforeEach(async () => {
  await setUpUsersDbInicialState();
});

describe('user addition', () => {
  test('is succeeds with a fresh username', async () => {
    const usersAtStart = await getAllUsersInDb();

    await api
      .post('/api/users')
      .send(userToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await getAllUsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(userToAdd.username);
  });

  test('fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await getAllUsersInDb();

    const result = await api
      .post('/api/users')
      .send(initialUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await getAllUsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('fails with proper status code and message if username is not sent', async () => {
    const usersAtStart = await getAllUsersInDb();

    const user = { password: '1234567890' };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` is required');

    const usersAtEnd = await getAllUsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('fails with proper status code and message if username is empty', async () => {
    const usersAtStart = await getAllUsersInDb();

    const user = {
      username: '',
      password: '1234567890',
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` is required');

    const usersAtEnd = await getAllUsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('fails with proper status code and message if username is not of minimum length', async () => {
    const usersAtStart = await getAllUsersInDb();

    const user = {
      username: 'a',
      password: '1234567890',
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(`\`username\` (\`${user.username}\`) is shorter than the minimum allowed length`);

    const usersAtEnd = await getAllUsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('fails with proper status code and message if password is not sent', async () => {
    const usersAtStart = await getAllUsersInDb();

    const user = { username: 'newUser' };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`password` is required');

    const usersAtEnd = await getAllUsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('fails with proper status code and message if password is empty', async () => {
    const usersAtStart = await getAllUsersInDb();

    const user = {
      username: 'newUser',
      password: '',
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`password` is required');

    const usersAtEnd = await getAllUsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('fails with proper status code and message if password is not of minimum length', async () => {
    const usersAtStart = await getAllUsersInDb();

    const user = {
      username: 'newUser',
      password: '1',
    };

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`password` is shorter than the minimum allowed length');

    const usersAtEnd = await getAllUsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
