import React from 'react';
import { useNavigate } from 'react-router-dom';
//import { TextField, Button } from '@mui/material';
import styled from 'styled-components';

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    onLogin('mluukkai');
    navigate('/');
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:
          <Input />
        </div>
        <div>
          password:
          <Input type='password' />
        </div>
        <div>
          <Button type='submit'>login</Button>
        </div>
      </form>
    </div >
  );
};

export default Login;
