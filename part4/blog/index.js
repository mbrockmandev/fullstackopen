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
  console.log(
    'Connected to:',
    MONGO_URI,
    '\nReadyState:',
    mongoose.connection.readyState,
  );
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

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
