const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('../utils/list_helper');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

// GET routes for User
describe('GET routes for USER here', () => {
  test('get all users', async () => {
    const results = await api.get('/api/users').expect(200);
    const usersInDb = await helper.usersInDb();
    console.log('usersInDb:', usersInDb);
    expect(usersInDb[0].username).toBe(results.body[0].username);
  });
});

describe('POST routes for user here', () => {
  beforeEach(async () => {
    await User.deleteOne({ username: 'jigglypuff' });
  });

  test('register a new user', async () => {
    const newUser = {
      username: 'jigglypuff',
      password: 'abc123',
      name: 'JigglyPuff Yo!',
    };

    await api.post('/api/users').send(newUser).expect(201);
  });

  test('should reject attempt to register a new user with no username', async () => {
    const newUser = {
      password: 'abc123',
      name: 'JigglyPuff Yo!',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });
});

// close connections!
afterAll(async () => {
  await mongoose.connection.close();
});
