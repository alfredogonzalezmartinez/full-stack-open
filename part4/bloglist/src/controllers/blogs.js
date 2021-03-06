const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');
const User = require('../models/User');
const { CustomError } = require('../utils/CustomError');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    throw new CustomError('AuthenticationError', 'token missing or invalid');
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });
  if (blog.likes === undefined) blog.likes = 0;
  const newBlog = await blog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await User.findByIdAndUpdate(user._id, user);
  const fullBlog = await Blog.findById(newBlog._id).populate('user', { username: 1, name: 1 });
  response.status(201).json(fullBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    throw new CustomError('AuthenticationError', 'token missing or invalid');
  }
  const blog = await Blog.findById(id);
  if (!blog) response.status(204).end();
  if (blog.user.toString() !== decodedToken.id) {
    throw new CustomError('AuthorizationError', 'unauthorized request');
  }
  await blog.remove();
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    throw new CustomError('AuthenticationError', 'token missing or invalid');
  }
  const { title, author, url, like } = request.body;
  const blog = await Blog.findById(id);
  if (like) {
    const updatedBlog = await Blog
      .findByIdAndUpdate(
        id,
        { likes: blog.likes + 1 },
        { new: true, runValidators: true },
      )
      .populate('user', { username: 1, name: 1 });
    return response.json(updatedBlog);
  }
  if (blog && blog.user.toString() !== decodedToken.id) {
    throw new CustomError('AuthorizationError', 'unauthorized request');
  }
  const updatedBlog = await Blog
    .findByIdAndUpdate(
      id,
      { title, author, url },
      { new: true, runValidators: true },
    )
    .populate('user', { username: 1, name: 1 });
  return response.json(updatedBlog);
});

module.exports = blogsRouter;
