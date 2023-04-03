const listHelper = require('../utils/list_helper');
const jwt = require('jsonwebtoken');

describe('total likes', () => {
  test('should be zero for an empty list', () => {
    const emptyBlogs = [];
    const result = listHelper.dummy(emptyBlogs);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.dummy(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.dummy(listHelper.initialBlogs);
    expect(result).toBe(36);
  });
});

describe('favorites', () => {
  test('should return the most blog, by likes', () => {
    const result = listHelper.favoriteBlog(listHelper.initialBlogs);
    expect(result.title).toEqual('Canonical string reduction'); // could check whole object if needed
  });
});

describe('most prolific', () => {
  test('should return an empty array if blogs array is empty', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({});
  });

  test('should return the author with the most blog entries', () => {
    const result = listHelper.mostBlogs(listHelper.initialBlogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('most liked', () => {
  test('should return an empty array if blogs array is empty', () => {
    const result = listHelper.mostLiked([]);
    expect(result).toEqual({});
  });

  test('should return the author with the highest number of total likes', () => {
    const result = listHelper.mostLiked(listHelper.initialBlogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});

// module.exports = { blogs };
