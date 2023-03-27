const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('../utils/list_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('valid entries to blog API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    for (const blog of helper.initialBlogs) {
      const blogObject = new Blog(blog);
      await blogObject.save();
    }
  });

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
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  test('get all blogs!', async () => {
    const results = await api.get('/api/blogs').expect(200);
    expect(results.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe('POST route and related info', () => {
  test('a valid blog gets added', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('if missing content, does not get added', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

// close connections!
afterAll(async () => {
  await mongoose.connection.close();
});
