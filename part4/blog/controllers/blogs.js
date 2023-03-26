const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  console.log('REQ', req);
  console.log('RES', res);
  try {
    const results = await Blog.find({});
    console.log('results:', results);
    res.json(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

blogsRouter.get('/:id', async (req, res) => {
  try {
    const result = await Blog.findById(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  try {
    const result = await blog.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

blogsRouter.post('/multiple', async (req, res) => {
  try {
    const { blogs } = req.body;
    const results = await Blog.insertMany(blogs);
    res.json(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const newBlog = req.body;
  console.log('NEWBLOG', newBlog);
  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ body: `${req.params.id} successfully deleted.` });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = blogsRouter;
