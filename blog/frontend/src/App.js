import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useNavigate } from 'react-router-dom';

const App = () => {
  // const blogFormRef = useRef();
  const navigate = useNavigate();

  // list of blogs
  const [blogs, setBlogs] = useState([]);

  // user login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [token, setToken] = useState(null);

  // new blog entry
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  // const [likes, setLikes] = useState(0);

  // notifications
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    const getLocalData = async () => {
      const localData = JSON.parse(window.localStorage.getItem('blogAppUser'));
      if (localData === null) {
        return;
      }
      try {
        await checkIfValidToken(localData.token);
        if (localData && isValidToken) {
          setUser(localData);
        }
      } catch (error) {
        setUser(null);
        setToken(null);
        window.localStorage.clear();
        console.log(error.message);
      }
    };
    getLocalData();
  }, [isValidToken]);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user && isValidToken) {
        try {
          const newBlogList = await blogService.getAll(token);
          setBlogs(newBlogList);
        } catch (error) {
          console.log(error);
        }
      } else {
        setUser(null);
      }
    };
    fetchBlogs();
  }, [isValidToken, token, user]);

  const checkIfValidToken = async (newToken) => {
    try {
      await axios.get('/api/login/checkToken', {
        headers: { Authorization: `Bearer ${newToken}` },
      });
      setIsValidToken(true);
      setToken(newToken);
    } catch {
      setIsValidToken(false);
    }
  };

  const handleAddBlog = async () => {
    try {
      const credentials = await loginService.getCredentials(token);

      const newBlog = {
        title,
        author,
        url,
        user: credentials.user,
      };
      await blogService.create(newBlog, token);
      setBlogs([...blogs, newBlog]);
      const message = `Successfully added "${newBlog.title}"`;
      showNotification(message, 'success');
      setAuthor('');
      setTitle('');
      setUrl('');
    } catch (error) {
      console.error(error.message);
      const message = `Error: ${error.message}!`;
      showNotification(message, 'error');
    }
  };

  const handleLike = async (blog) => {
    try {
      const incrementedLikes = blog.likes + 1;
      const data = {
        likes: incrementedLikes,
      };
      await blogService.update(`${blog.id}`, data, token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
        const blogId = blog.id;
        await blogService.removeBlog(`${blog.id}`, token);
        setBlogs(blogs.filter((b) => b.id !== blogId));
        showNotification(`${blog.title} was successfully deleted.`, 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('blogAppUser', JSON.stringify(user));
      const message = `${user.username} logged in!`;
      showNotification(message, 'success');
      setUser(user);
      setToken(user.token);
      setUsername('');
      setPassword('');
      navigate('/blogs');
    } catch (error) {
      const message = 'Incorrect username/password.';
      showNotification(message, 'error');
      console.log(error.message);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    window.localStorage.removeItem('blogAppUser');
  };

  const showNotification = (message, type, duration = 5000) => {
    setNotificationMessage(message);
    setNotificationType(type);

    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, duration);
  };

  return (
    <div className='app-container'>
      <Notification
        message={notificationMessage}
        type={notificationType}
      />
      {!user && (
        <div className='login-form-container'>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            loggedIn={user}
          />
        </div>
      )}
      {user && (
        <div>
          <Togglable buttonLabel='Add New Blog'>
            <BlogForm
              onAddBlog={handleAddBlog}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
              title={title}
              author={author}
              url={url}
              token={token}
            />
          </Togglable>
          <div className='blog-list-container'>
            <BlogList
              username={user.username}
              handleLogout={handleLogout}
              blogs={blogs}
              onLike={handleLike}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
