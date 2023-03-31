import { useState, useEffect } from 'react';
import Blog from './Blog';

const BlogList = ({
  username,
  handleLogout,
  blogs,
  token,
  postDeleteNotification,
}) => {
  const [blogList, setBlogList] = useState(blogs);

  useEffect(() => {
    setBlogList(blogs);
  }, [blogs]);

  const handleDeleteBlog = (id, blogToBeDeleted) => {
    setBlogList(blogList.filter((blog) => blog.id !== id));
    postDeleteNotification(blogToBeDeleted);
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {username} Logged In.
        <button onClick={handleLogout}>Logout</button>
      </p>

      {blogList.map((blog) => (
        <Blog
          key={`${blog.id}_${blog.title}`}
          blog={blog}
          token={token}
          onDelete={handleDeleteBlog}
        />
      ))}
    </div>
  );
};

export default BlogList;
