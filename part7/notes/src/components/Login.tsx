import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({onLogin}) => {
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin('mluukkai');
    navigate('/');
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default Login;
