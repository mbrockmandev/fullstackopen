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

describe('valid entries to blog API', () => {
  test('the id property is defined when making a Blog object', async () => {
    const blog = new Blog({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://google.com',
      likes: 6,
    });

    const json = blog.toJSON();
    expect(json._id).toBeUndefined();
    expect(json.id).toBeDefined();
  });
});

describe('HTTP request verify?', () => {
  test('making an http post request to /api/blogs creates a new blog post', async () => {
    const blogToBeAdded = new Blog({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://google.com',
      likes: 6,
    });

    await api
      .post('/api/notes')
      .expect(201)
      .expect('Content-Type', /application\/json/);
      
  });
});

test('should get all notes from /api/blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(blogs.length);
});

// close connections!
afterAll(async () => {
  await mongoose.connection.close();
});
