import { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';

const App = () => {
  // notes
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  // notifications
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');
  // users
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
      })
      .catch((error) => {
        showNotificationMessage(`Error: ${error.message}`);
        setNotificationType('error');
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      noteService.setToken(user.token);
      console.log('user:', user);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      showNotificationMessage('Incorrect username/password.');
    }
  };

  const noteForm = () => {
    return (
      <form onSubmit={addNote}>
        <input
          className='input'
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>Save</button>
      </form>
    );
  };

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        showNotificationMessage(`Added ${returnedNote.content}`);
        setNotificationType('success');
      })
      .catch((error) => {
        // handle validation errors!
        const input = error.request.response;
        const startIndex = input.indexOf('ValidationError');
        const endIndex = input.indexOf('<br>', startIndex);
        const errorMessage = input.slice(startIndex, endIndex);

        showNotificationMessage(`${errorMessage}`);
        setNotificationType('error');
      });
    setNewNote('');
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        showNotificationMessage(
          `The note ${note.content} was already deleted from the server.`,
        );
        setNotificationType('error');
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const showNotificationMessage = (message, duration = 5000) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, duration);
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div className='app'>
      <div className='header'>
        <h1>Notes</h1>
        <Notification
          message={notificationMessage}
          type={notificationType}
        />

        {!user && (
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        )}

        {user && (
          <div className='user'>
            <p>{user.username} logged in</p>
            {noteForm()}
          </div>
        )}

        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <ul className='note-container'>
          {notesToShow.map((note) => (
            <Note
              className='note'
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
        <form onSubmit={addNote}>
          <input
            value={newNote}
            onChange={handleNoteChange}
          />
          <button type='submit'>save</button>
        </form>
        <Footer />
      </div>
    </div>
  );
};

export default App;
