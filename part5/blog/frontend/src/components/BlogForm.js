import { useState } from 'react';

const BlogForm = ({ handleAddBlog }) => {
  const [newBlog, setNewBlog] = useState(null);

  const addBlog = (e) => {
    e.preventDefault();
    handleAddBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
    });

    setNewBlog(null);
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <p>Add Blog: </p>
        <p>Title:</p>
        <input
          type='text'
          value={newBlog.title}
          name='title'
        />
        <p>Author:</p>
        <input
          type='text'
          value={newBlog.author}
          name='author'
        />
        <p>URL:</p>
        <input
          type='text'
          value={newBlog.url}
          name='url'
        />
        <p>Likes:</p>
        <input
          type='number'
          value={newBlog.likes}
          name='likes'
        />
        <button type='submit'>Save New</button>
      </div>
    </form>
  );
};

export default BlogForm;
