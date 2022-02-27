const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const {
  initialBlogs,
  blogToAdd,
  blogWithoutTitle,
  blogWithoutUrl,
  blogWithoutLikes,
  setUpDbInicialState,
  getAllBlogsInDb,
  getBlogInDb,
} = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await setUpDbInicialState();
});

describe('blogs request', () => {
  test('is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returns the right number of blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

test('blog has id proterty', async () => {
  const response = await api.get('/api/blogs');
  const { id } = response.body[0];
  expect(id).toBeDefined();
});

describe('blog addition', () => {
  test('increments number of blogs in database', async () => {
    await api.post('/api/blogs').send(blogToAdd);
    const blogsInDb = await getAllBlogsInDb();
    expect(blogsInDb).toHaveLength(initialBlogs.length + 1);
  });

  test('saves right content in database', async () => {
    const respose = await api.post('/api/blogs').send(blogToAdd);
    const { id } = respose.body;
    const newBlog = await getBlogInDb(id);
    expect(newBlog.title).toBe(blogToAdd.title);
    expect(newBlog.author).toBe(blogToAdd.author);
    expect(newBlog.url).toBe(blogToAdd.url);
    expect(newBlog.likes).toBe(blogToAdd.likes);
  });

  test('without likes, likes are 0', async () => {
    const respose = await api.post('/api/blogs').send(blogWithoutLikes);
    const { id } = respose.body;
    const newBlog = await getBlogInDb(id);
    expect(newBlog.likes).toBe(0);
  });

  test('without title property, returns bad request ', async () => {
    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400);
  });

  test('without url property, returns bad request ', async () => {
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
