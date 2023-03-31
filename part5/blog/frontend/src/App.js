import { useState, useEffect, useRef } from 'react';
import './App.css';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const blogFormRef = useRef();

  // list of blogs
  const [blogs, setBlogs] = useState([]);

  // user login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // new blog entry
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  // notifications
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('blogAppUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const handleAddBlog = async () => {
    try {
      const newBlog = {
        title,
        author,
        url,
      };

      // blogFormRef.current.toggleVisibility();
      await blogService.create(newBlog);
      setBlogs([...blogs, newBlog]);
      const message = `Successfully added "${newBlog.title}!"`;
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('blogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      const message = `${user.username} logged in!`;
      showNotification(message, 'success');
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      const message = 'Incorrect username/password.';
      showNotification(message, 'error');
      console.log(error);
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
          />
        </div>
      )}
      {user && (
        <div>
          <Togglable buttonLabel='Add New Blog'>
            <BlogForm
              handleAddBlog={handleAddBlog}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
              title={title}
              author={author}
              url={url}
            />
          </Togglable>
          <div className='blog-list-container'>
            <BlogList
              username={username}
              handleLogout={handleLogout}
              handleAddBlog={handleAddBlog}
              blogs={blogs}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
