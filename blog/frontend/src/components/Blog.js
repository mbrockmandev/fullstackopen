import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, onLike, onDelete, username }) => {
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
    return blog;
  };

  const handleDelete = () => {
    onDelete(blog);
    return blog;
  };

  return (
    <div style={blogStyle}>
      <div className='title-author-container'>
        <div className='title-author'>
          {blog.title} -- {blog.author}
        </div>
        <button
          id='btn-details'
          onClick={toggleDetails}>
          View Details
        </button>
        {detailsVisibility && (
          <div className='url-likes-container'>
            <p className='url-text'>URL: {blog.url}</p>
            <p className='likes-text'>
              Likes: {likes}{' '}
              <button
                id='btn-like'
                onClick={handleLike}>
                Like?
              </button>
            </p>
            {blog.user.username && <p>User: {blog.user.username}</p>}

            {username === blog.user.username ? (
              <button
                id='btn-delete'
                onClick={handleDelete}>
                Delete
              </button>
            ) : null}
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
  username: PropTypes.string.isRequired,
};

export default Blog;
