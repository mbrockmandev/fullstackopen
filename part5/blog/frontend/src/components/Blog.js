import { useState } from 'react';

const Blog = ({ blog, handleLike }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    margin: 5,
    padding: 5,
  };

  const toggleDetails = (e) => {
    e.preventDefault();

    if (!!detailsVisibility) {
      e.target.innerText = 'View Details';
    } else {
      e.target.innerText = 'Hide Details';
    }
    setDetailsVisibility(!detailsVisibility);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} -- {blog.author} --{' '}
        <button
          id='details-btn'
          onClick={toggleDetails}>
          View Details
        </button>
        {detailsVisibility && (
          <div>
            <p>URL: {blog.url}</p>
            <p>
              Likes: {blog.likes} <button onClick={handleLike}>Like?</button>
            </p>
            <p>User: {blog.user}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
