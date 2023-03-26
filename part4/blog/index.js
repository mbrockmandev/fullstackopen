const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

console.log('Connecting to: MongoDB');
mongoose.connect(MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());

app.get('/api/blogs', async (req, res) => {
  try {
    const results = await Blog.find({});
    res.json(results);
  } catch (err) {
    console.log(err);
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const result = await Blog.findById(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).end();
    }
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

app.post('/api/blogs/multiple', async (req, res) => {
  try {
    const { blogs } = req.body;
    const results = await Blog.insertMany(blogs);
    res.json(results);
  } catch (err) {
    console.log('error!');
    console.log(err);
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  const newBlog = req.body;
  console.log('NEWBLOG', newBlog);
  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ body: `${req.params.id} successfully deleted.` });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
