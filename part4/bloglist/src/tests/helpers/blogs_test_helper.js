const jwt = require('jsonwebtoken');
const Blog = require('../../models/Blog');
const {
  getAllUsersInDb,
  setUpUsersDbInicialState,
} = require('./users_test_helper');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

const blogToAdd = {
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
};

const blogWithoutTitle = {
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
};

const blogWithoutUrl = {
  title: 'Type wars',
  author: 'Robert C. Martin',
  likes: 2,
};

const blogWithoutLikes = {
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
};

const blogInfoForUpdating = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 20,
};

const addBlog = async ({ title, author, url, likes, user }) => {
  const blog = await new Blog({ title, author, url, likes, user });
  await blog.save();
};

const setUpBlogsDbInicialState = async () => {
  await Blog.deleteMany({});
  await setUpUsersDbInicialState();
  const [user] = await getAllUsersInDb();
  await Promise.all(initialBlogs.map((blog) => addBlog({ ...blog, user: user.id })));
};

const getAllBlogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const getBlogInDb = async (id) => Blog.findById(id);

const getToken = async () => {
  const { id, username } = (await getAllUsersInDb())[0];
  const token = jwt.sign({ id, username }, process.env.SECRET);
  return token;
};

module.exports = {
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
};
