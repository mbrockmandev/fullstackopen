const BlogForm = ({
  onAddBlog,
  setTitle,
  setAuthor,
  setUrl,
  title,
  author,
  url,
}) => {
  const addBlog = async (e) => {
    e.preventDefault();

    onAddBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <p>Add Blog: </p>
        <p>Title:</p>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name='title'
        />
        <p>Author:</p>
        <input
          type='text'
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
          name='author'
        />
        <p>URL:</p>
        <input
          type='text'
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          name='url'
        />
        <button type='submit'>Save New</button>
      </div>
    </form>
  );
};

export default BlogForm;
