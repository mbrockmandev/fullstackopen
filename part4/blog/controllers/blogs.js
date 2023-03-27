const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const results = await Blog.find({});
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
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.status(201).json(result);
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

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({ body: `${req.params.id} successfully deleted.` });
});

module.exports = blogsRouter;
