import React from 'react';

const AddBlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  handleAddBlog,
}) => {
  return (
    <form onSubmit={handleAddBlog}>
      <div>
        <p>Title: </p>
        <input
          type='text'
          value={title}
          name='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <p>Author: </p>
        <input
          type='text'
          value={author}
          name='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <p>URL: </p>
        <input
          type='text'
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>Add Blog</button>
    </form>
  );
};

export default AddBlogForm;
