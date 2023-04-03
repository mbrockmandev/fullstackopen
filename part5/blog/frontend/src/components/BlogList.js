import { useState, useEffect } from 'react';
import Blog from './Blog';

const BlogList = ({ username, handleLogout, blogs, onLike, onDelete }) => {
  const [blogList, setBlogList] = useState(blogs);
  const [sortMethod, setSortMethod] = useState('title');

  useEffect(() => {
    setBlogList(blogs);
  }, [blogs]);

  // const onDelete = (id, blogToBeDeleted) => {
  //   setBlogList(blogList.filter((blog) => blog.id !== id));
  //   postDeleteNotification(blogToBeDeleted);
  // };

  const toggleSortMethod = () => {
    if (sortMethod === 'title') {
      setSortMethod('author');
    } else if (sortMethod === 'author') {
      setSortMethod('likes');
    } else {
      setSortMethod('title');
    }
  };

  useEffect(() => {
    const sortBlogList = () => {
      if (sortMethod === 'title') {
        const newSortedBlogList = [...blogList].sort((lhs, rhs) =>
          lhs.title.localeCompare(rhs.title),
        );
        setBlogList(newSortedBlogList);
      } else if (sortMethod === 'author') {
        const newSortedBlogList = [...blogList].sort((lhs, rhs) =>
          lhs.author.localeCompare(rhs.author),
        );
        setBlogList(newSortedBlogList);
      } else {
        const newSortedBlogList = [...blogList].sort(
          (lhs, rhs) => rhs.likes - lhs.likes,
        );
        setBlogList(newSortedBlogList);
      }
    };
    sortBlogList();
  }, [sortMethod]);

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {username} Logged In.
        <button
          id='btn-logout'
          onClick={handleLogout}>
          Logout
        </button>
      </p>
      <p>Sorting by: {sortMethod}</p>
      <button
        id='btn-sort'
        onClick={toggleSortMethod}>
        Change Sort
      </button>

      {blogList.map((blog) => (
        <Blog
          key={`${blog.id}_${blog.title}`}
          blog={blog}
          onLike={onLike}
          onDelete={onDelete}
          username={username}
        />
      ))}
    </div>
  );
};

export default BlogList;
