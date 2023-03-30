import { useState, useEffect } from 'react';
import './App.css';
import Blog from './components/Blog';
import AddBlogForm from './components/AddBlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  // list of blogs
  const [blogs, setBlogs] = useState([]);

  // user login
  const [username, setUsername] = useState('mike');
  const [password, setPassword] = useState('12345');
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

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      console.log('newBlog:', newBlog);
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
      const message = `${user.username} logged in!"`;
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

  if (!user) {
    return (
      <>
        <Notification
          message={notificationMessage}
          type={notificationType}
        />
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </>
    );
  } else {
    return (
      <div>
        <Notification
          message={notificationMessage}
          type={notificationType}
        />
        <h2>blogs</h2>
        <p>
          {user.username} is Logged In.{' '}
          <button onClick={handleLogout}>Logout</button>
        </p>

        {user && (
          <AddBlogForm
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            handleAddBlog={handleAddBlog}
          />
        )}

        {blogs.map((blog) => (
          <Blog
            key={`${blog.id}_${blog.title}`}
            blog={blog}
          />
        ))}
      </div>
    );
  }
};

export default App;
