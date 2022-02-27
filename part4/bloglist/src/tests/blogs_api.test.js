const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const {
  initialBlogs,
  blogToAdd,
  blogWithoutTitle,
  blogWithoutUrl,
  blogWithoutLikes,
  blogInfoForUpdating,
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

describe('blog removig', () => {
  test('decrements number of blogs in database', async () => {
    const [blog] = await getAllBlogsInDb();
    const { id } = blog;
    await api.delete(`/api/blogs/${id}`);
    const blogsInDb = await getAllBlogsInDb();
    expect(blogsInDb).toHaveLength(initialBlogs.length - 1);
  });

  test('deletes the right blog', async () => {
    const [blogToDelete] = await getAllBlogsInDb();
    const { id } = blogToDelete;
    await api.delete(`/api/blogs/${id}`);
    const blogsInDb = await getAllBlogsInDb();
    const urls = blogsInDb.map(({ url }) => url);
    expect(urls).not.toContain(blogToDelete.url);
  });

  test('with malformatted id, returns bad request', async () => {
    const id = 1;
    await api
      .delete(`/api/blogs/${id}`)
      .expect(400);
  });
});

describe('blog updating', () => {
  test("doesn't modify number of blogs in database", async () => {
    const [blogToUpdate] = await getAllBlogsInDb();
    const { id } = blogToUpdate;
    const { likes } = blogInfoForUpdating;
    await api.put(`/api/blogs/${id}`).send({ likes });
    const blogsInDb = await getAllBlogsInDb();
    expect(blogsInDb).toHaveLength(initialBlogs.length);
  });

  test('with all properties, modifies the blog right', async () => {
    const [blogToUpdate] = await getAllBlogsInDb();
    const { id } = blogToUpdate;
    const {
      title, author, url, likes,
    } = blogInfoForUpdating;
    await api.put(`/api/blogs/${id}`).send({
      title, author, url, likes,
    });
    const updatedBlog = await getBlogInDb(id);
    expect(updatedBlog.title).toBe(title);
    expect(updatedBlog.author).toBe(author);
    expect(updatedBlog.url).toBe(url);
    expect(updatedBlog.likes).toBe(likes);
  });

  test('with a property, modifies that property only', async () => {
    const [blogToUpdate] = await getAllBlogsInDb();
    const { id } = blogToUpdate;
    const { likes } = blogInfoForUpdating;
    const oldBlog = await getBlogInDb(id);
    await api.put(`/api/blogs/${id}`).send({ likes });
    const updatedBlog = await getBlogInDb(id);
    expect(updatedBlog.title).toBe(oldBlog.title);
    expect(updatedBlog.author).toBe(oldBlog.author);
    expect(updatedBlog.url).toBe(oldBlog.url);
    expect(updatedBlog.likes).toBe(likes);
  });

  test('returns the updated blog', async () => {
    const [blogToUpdate] = await getAllBlogsInDb();
    const { id } = blogToUpdate;
    const { likes } = blogInfoForUpdating;
    const respose = await api.put(`/api/blogs/${id}`).send({ likes });
    const responseBlog = respose.body;
    const updatedBlog = await getBlogInDb(id);
    expect(responseBlog.title).toBe(responseBlog.title);
    expect(responseBlog.author).toBe(updatedBlog.author);
    expect(responseBlog.url).toBe(updatedBlog.url);
    expect(responseBlog.likes).toBe(updatedBlog.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
