const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = 'mongodb://localhost/blogList';
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get('/api/blogs', async (req, res) => {
  try {
    const results = Blog.find({});
    res.json(results);
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  try {
    const result = await blog.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
});
