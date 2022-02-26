const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch(next);
});

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch(next);
});

module.exports = blogsRouter;
