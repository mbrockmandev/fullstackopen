import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, token, onDelete }) => {
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

    

    if (!!detailsVisibility) {
      e.target.innerText = 'View Details';
    } else {
      e.target.innerText = 'Hide Details';
    }
    setDetailsVisibility(!detailsVisibility);
  };

  const handleLike = async () => {
    try {
      const incrementedLikes = likes + 1;
      const data = {
        likes: incrementedLikes,
      };
      const res = await blogService.update(`${blog.id}`, data, token);
      setLikes(res.likes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const blogToBeDeleted = blog;
      if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
        await blogService.removeBlog(`${blog.id}`, token);
        onDelete(blog.id, blogToBeDeleted);
      }
    } catch (error) {
      console.log(error);
    }
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

export default Blog;
