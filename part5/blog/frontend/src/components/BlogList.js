import React from 'react';
import AddBlogForm from '../components/AddBlogForm';
import Blog from './Blog';

const BlogList = ({
  handleLogout,
  user,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  handleAddBlog,
  blogs,
}) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>

      {user && (
        <AddBlogForm
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
          handleAddBlog={handleAddBlog}
        />
      )}

      {blogs.map((blog) => (
        <Blog
          key={`${blog.id}_${blog.title}`}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default BlogList;
