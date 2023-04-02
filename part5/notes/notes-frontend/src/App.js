import { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';

const App = () => {
  // const noteFormRef = useRef();

  // notes
  const [notes, setNotes] = useState([]);
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
      setNotificationType('error');
      showNotificationMessage('Incorrect username/password.');
    }
  };

  const addNote = async (noteObject) => {
    try {
      const res = await noteService.create(noteObject);
      console.log('res:', res);
      setNotes([...notes, res]);
      showNotificationMessage(`Added ${res.content}`);
      setNotificationType('success');
      // noteFormRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
      const input = error.request;
      const startIndex = input.indexOf('ValidationError');
      const endIndex = input.indexOf('<br>', startIndex);
      const errorMessage = input.slice(startIndex, endIndex);

      showNotificationMessage(`${errorMessage}`);
      setNotificationType('error');
    }
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch(() => {
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

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div className='app'>
      <div className='header'>
        <h1>Notes App</h1>
        <Notification
          message={notificationMessage}
          type={notificationType}
        />

        {!user && (
          <Togglable buttonLabel='Login'>
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          </Togglable>
        )}
        {user && (
          <div>
            <p>{user.username} logged in</p>
            <Togglable buttonLabel='New Note'>
              <NoteForm createNote={addNote} />
            </Togglable>
          </div>
        )}

        <div>
          <button onClick={() => setShowAll(!showAll)}>
            Show {showAll ? 'important' : 'all'}
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
        <Footer />
      </div>
    </div>
  );
};

export default App;
