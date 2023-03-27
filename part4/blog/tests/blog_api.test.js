const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('../utils/list_helper');
const { blogs } = require('./list_helper.test');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of blogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('should get all notes from /api/blogs', async () => {
  const response = await api.get('/api/blogs');
  console.log('BLOGS==', blogs);

  expect(response.body).toHaveLength(blogs.length);
});

// close connections!
afterAll(async () => {
  await mongoose.connection.close();
});
