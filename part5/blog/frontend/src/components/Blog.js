import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, onLike, onDelete }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

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

    // previously !!detailsVisibility
    if (detailsVisibility) {
      e.target.innerText = 'View Details';
    } else {
      e.target.innerText = 'Hide Details';
    }
    setDetailsVisibility(!detailsVisibility);
  };

  const handleLike = () => {
    onLike(blog);
    const newLikes = likes + 1;
    setLikes(newLikes);
  };

  const handleDelete = () => {
    onDelete(blog);
  };

  return (
    <div style={blogStyle}>
      <div className='title-author-container'>
        <div className='title-author'>
          {blog.title} -- {blog.author}
        </div>
        <button
          id='details-btn'
          onClick={toggleDetails}>
          View Details
        </button>
        {detailsVisibility && (
          <div className='url-likes-container'>
            <p className='url-text'>URL: {blog.url}</p>
            <p className='likes-text'>
              Likes: {likes} <button onClick={handleLike}>Like?</button>
            </p>
            {blog.user.username && <p>User: {blog.user.username}</p>}

            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blog;
