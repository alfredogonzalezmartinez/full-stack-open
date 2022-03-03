const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = new Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
  },
  author: String,
  url: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
  },
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const blog = returnedObject;
    blog.id = blog._id.toString();
    delete blog._id;
    delete blog.__v;
  },
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
