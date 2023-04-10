import { useState } from 'react';
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom';
import Home from './components/Home';
import Note from './components/Note';
import Notes from './components/Notes';
import Users from './components/Users';
import Login from './components/Login';
import React from 'react';
// import { Alert, Container, AppBar, Toolbar, IconButton, Button } from '@mui/material';
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

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

const App = () => {

  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ]);

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const login = (user) => {
    setUser(user);
    setMessage(`Welcome, ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000);

  };

  const padding = {
    padding: 5,
  };

  const match = useMatch('/notes/:id');
  const note = match
    ? notes.find((n) => n.id === Number(match.params.id))
    : null;
  //
  return (
    <Page>
      <Navigation>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/notes'>notes</Link>
        <Link style={padding} to='/users'>users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to='/login'>login</Link>
        }
      </Navigation>

      <Routes>
        <Route
          path='/notes/:id'
          element={<Note note={note} />}
        />
        <Route
          path='/notes'
          element={<Notes notes={notes} />}
        />
        <Route
          path='/users'
          element={
            user ? (
              <Users />
            ) : (
              <Navigate
                replace
                to='/login'
              />
            )
          }
        />
        <Route
          path='/login'
          element={<Login onLogin={login} />}
        />
        <Route
          path='/'
          element={<Home />}
        />
      </Routes>

      <Footer>
        <br />
        <em>Note app, Department of Computer Science 2023</em>
      </Footer>
    </Page >
  );
};

export default App;
