import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/users';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    // const loggedInUserJSON = window.localStorage.getItem('blogAppUser');
    // if (loggedInUserJSON !== undefined) {
    //   const user = JSON.parse(loggedInUserJSON);
    //   setUser(user);
    //   blogService.setToken(user.token);
    // }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      // window.localStorage.setItem('blogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      console.log('user:', user);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    );
  }
};

export default App;
