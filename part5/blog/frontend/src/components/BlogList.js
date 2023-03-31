import Blog from './Blog';

const BlogList = ({ username, handleLogout, blogs }) => {
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
        />
      ))}
    </div>
  );
};

export default BlogList;
