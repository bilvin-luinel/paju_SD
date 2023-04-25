const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  is_notice: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  font: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;