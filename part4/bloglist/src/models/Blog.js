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
});

blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
  transform: (document, object) => {
    const returnedObject = object;
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
