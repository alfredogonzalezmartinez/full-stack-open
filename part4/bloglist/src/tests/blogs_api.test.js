const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const {
  blogInfoForUpdating,
  blogToAdd,
  blogWithoutLikes,
  blogWithoutTitle,
  blogWithoutUrl,
  getAllBlogsInDb,
  getBlogInDb,
  getToken,
  initialBlogs,
  setUpBlogsDbInicialState,
} = require('./helpers/blogs_test_helper');

const api = supertest(app);

beforeEach(async () => {
  await setUpBlogsDbInicialState();
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
    const token = await getToken();
    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .set({ Authorization: `bearer ${token}` });
    const blogsInDb = await getAllBlogsInDb();
    expect(blogsInDb).toHaveLength(initialBlogs.length + 1);
  });

  test('saves right content in database', async () => {
    const token = await getToken();
    const respose = await api
      .post('/api/blogs')
      .send(blogToAdd)
      .set({ Authorization: `bearer ${token}` });
    const { id } = respose.body;
    const newBlog = await getBlogInDb(id);
    expect(newBlog.title).toBe(blogToAdd.title);
    expect(newBlog.author).toBe(blogToAdd.author);
    expect(newBlog.url).toBe(blogToAdd.url);
    expect(newBlog.likes).toBe(blogToAdd.likes);
  });

  test('without likes, likes are 0', async () => {
    const token = await getToken();
    const respose = await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .set({ Authorization: `bearer ${token}` });
    const { id } = respose.body;
    const newBlog = await getBlogInDb(id);
    expect(newBlog.likes).toBe(0);
  });

  test('without title property, returns bad request ', async () => {
    const token = await getToken();
    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .set({ Authorization: `bearer ${token}` })
      .expect(400);
  });

  test('without url property, returns bad request ', async () => {
    const token = await getToken();
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .set({ Authorization: `bearer ${token}` })
      .expect(400);
  });

  test('without token, returns unauthorized ', async () => {
    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(401);
  });
});

describe('blog removig', () => {
  test('decrements number of blogs in database', async () => {
    const [blog] = await getAllBlogsInDb();
    const { id } = blog;
    const token = await getToken();
    await api
      .delete(`/api/blogs/${id}`)
      .set({ Authorization: `bearer ${token}` });
    const blogsInDb = await getAllBlogsInDb();
    expect(blogsInDb).toHaveLength(initialBlogs.length - 1);
  });

  test('deletes the right blog', async () => {
    const [blogToDelete] = await getAllBlogsInDb();
    const { id } = blogToDelete;
    const token = await getToken();
    await api
      .delete(`/api/blogs/${id}`)
      .set({ Authorization: `bearer ${token}` });
    const blogsInDb = await getAllBlogsInDb();
    const urls = blogsInDb.map(({ url }) => url);
    expect(urls).not.toContain(blogToDelete.url);
  });

  test('with malformatted id, returns bad request', async () => {
    const id = 1;
    const token = await getToken();
    await api
      .delete(`/api/blogs/${id}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(400);
  });

  test('without token, returns unauthorized ', async () => {
    const [blogToDelete] = await getAllBlogsInDb();
    const { id } = blogToDelete;
    await api
      .delete(`/api/blogs/${id}`)
      .expect(401);
  });
});

describe('blog updating', () => {
  test("doesn't modify number of blogs in database", async () => {
    const [blogToUpdate] = await getAllBlogsInDb();
    const { id } = blogToUpdate;
    const { likes } = blogInfoForUpdating;
    const token = await getToken();
    await api
      .put(`/api/blogs/${id}`)
      .send({ likes })
      .set({ Authorization: `bearer ${token}` });
    const blogsInDb = await getAllBlogsInDb();
    expect(blogsInDb).toHaveLength(initialBlogs.length);
  });

  test('with all properties, modifies the blog right', async () => {
    const [blogToUpdate] = await getAllBlogsInDb();
    const { id } = blogToUpdate;
    const { title, author, url, likes } = blogInfoForUpdating;
    const token = await getToken();
    await api
      .put(`/api/blogs/${id}`)
      .send({ title, author, url, likes })
      .set({ Authorization: `bearer ${token}` });
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
    const token = await getToken();
    await api
      .put(`/api/blogs/${id}`)
      .send({ likes })
      .set({ Authorization: `bearer ${token}` });
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
    const token = await getToken();
    const respose = await api
      .put(`/api/blogs/${id}`)
      .send({ likes })
      .set({ Authorization: `bearer ${token}` });
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
