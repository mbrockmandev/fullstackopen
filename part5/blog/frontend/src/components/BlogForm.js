import React from 'react';

const BlogForm = ({ newBlog, addBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        <p>Add Blog: </p>
        <input
          type='text'
          value={newBlog}
          name='newblog'
          // onChange={({ target }) => setnewBlog(target.value)}
        />
      </div>
    </form>
  );
};

export default BlogForm;
