const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('../utils/list_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  // Create a root user
  await User.deleteMany({});

  // Create blogs without user
  await Blog.deleteMany({});
  const noteObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = noteObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

// validation
describe('validate properties', () => {
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

// GET route tests
describe('HTTP request verify?', () => {
  let token;
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);

    const user = {
      username: 'mike',
      password: '12345',
    };
    const res = await api.post('/api/login').send(user);
    token = `Bearer ${res.body.token}`;
  });

  test('get all blogs!', async () => {
    const results = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(results.body).toHaveLength(helper.initialBlogs.length);
  });
});

// POST route tests
describe('POST route and related info', () => {
  let token;

  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);

    const user = {
      username: 'mike',
      password: '12345',
    };
    const res = await api.post('/api/login').send(user);
    token = `Bearer ${res.body.token}`;
  });

  test('a valid blog gets added using valid info', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', token)
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
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('if url is missing, default to empty string', async () => {
    const newBlog = {
      title: 'Canonical string reduction2',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const newBlogEntry = await blogsAtEnd.find(
      (blog) => blog.title === 'Canonical string reduction2',
    );

    expect(newBlogEntry.url).toStrictEqual('');
  });

  test('if likes property is missing, default to 0', async () => {
    const newBlog = {
      title: 'Canonical string reduction2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const newBlogEntry = await blogsAtEnd.find(
      (blog) => blog.title === 'Canonical string reduction2',
    );

    expect(newBlogEntry.likes).toStrictEqual(0);
  });
});

// PUT route tests
describe('PUT ROUTES HERE', () => {
  let token;

  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);

    const user = {
      username: 'mike',
      password: '12345',
    };
    const res = await api.post('/api/login').send(user);
    token = `Bearer ${res.body.token}`;
  });

  test('a valid blog gets updated', async () => {
    const oldBlogEntry = await api.get('/api/blogs/5a422b3a1b54a676234d17f9');

    const newBlog = {
      title: 'Canonical string reduction 222',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };

    await api
      .put('/api/blogs/5a422b3a1b54a676234d17f9')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlogEntry = await blogsAtEnd.find(
      (blog) => blog.title === 'Canonical string reduction 222',
    );
    expect(oldBlogEntry.body.title).not.toStrictEqual(updatedBlogEntry.title);
    expect(updatedBlogEntry.title).toStrictEqual(newBlog.title);
  });
});

// DELETE route tests
describe('DELETE ROUTES HERE', () => {
  let token;

  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);

    const user = {
      username: 'mike',
      password: '12345',
    };
    const res = await api.post('/api/login').send(user);
    token = `Bearer ${res.body.token}`;
  });

  test('a valid blog gets deleted', async () => {
    const oldBlogEntry = await api.get('/api/blogs/5a422b3a1b54a676234d17f9');

    await api
      .delete('/api/blogs/5a422b3a1b54a676234d17f9')
      .set('Authorization', token)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });
});

// close connections!
afterAll(async () => {
  await mongoose.connection.close();
});
