const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
  const results = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  res.json(results);
});

blogsRouter.get('/:id', async (req, res) => {
  const result = await Blog.findById(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;

  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url || '',
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.post('/multiple', async (req, res) => {
  const { blogs } = req.body;
  const results = await Blog.insertMany(blogs);
  res.json(results);
});

blogsRouter.put('/:id', async (req, res) => {
  const newBlog = req.body;
  const result = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
    new: true,
  });
  res.json(result);
});

blogsRouter.put('/multiple', async (req, res) => {
  const { blogs } = req.body;
  const result = await Blog.updateMany(blogs, { new: true });
  res.json(result);
});

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken || !decodedToken.id) {
    res.status(401).json({ error: 'Must include a valid token.' });
  }

  const blogToBeDeleted = await Blog.findById(req.params.id);
  const user = await User.findById(decodedToken.id);

  if (user._id.toString() !== blogToBeDeleted.user._id.toString()) {
    res.status(401).json({ error: 'Unauthorized access.' });
  }

  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).json({ body: `${req.params.id} successfully deleted.` });
});

module.exports = blogsRouter;
