import { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';
import loginService from './services/login';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');
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
        showNotificationMessage(
          `You need to look into why you couldn't GET: ${error.message}`,
        );
        setNotificationType('error');
      });
  }, []);

  const handleLogin = async (e) => {
    console.log('user.name:', user.name);
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      showNotificationMessage('Incorrect username/password.');
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username:{' '}
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:{' '}
          <input
            type='text'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    );
  };

  const noteForm = () => {
    return (
      <form onSubmit={addNote}>
        <input
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
    <div>
      <h1>Notes</h1>
      <Notification
        message={notificationMessage}
        type={notificationType}
      />

      {!user && loginForm()}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
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
  );
};

export default App;
