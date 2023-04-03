import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  loggedIn,
}) => {
  if (loggedIn) return null;

  return (
    <form onSubmit={handleLogin}>
      <div>
        <p>Username: </p>
        <input
          id='username'
          type='text'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <p>Password: </p>
        <input
          id='password'
          type='password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button
        id='btn-login'
        type='submit'>
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
