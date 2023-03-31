import Blog from './Blog';

const BlogList = ({ username, handleLogout, blogs, handleLike }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {username} Logged In.
        <button onClick={handleLogout}>Logout</button>
      </p>

      {blogs.map((blog) => (
        <Blog
          key={`${blog.id}_${blog.title}`}
          blog={blog}
          handleLike={handleLike}
        />
      ))}
    </div>
  );
};

export default BlogList;
