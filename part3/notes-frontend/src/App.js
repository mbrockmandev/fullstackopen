import { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
      })
      .catch((error) => {
        showNotificationMessage(
          `You need to look into why you couldn't GET: ${error}`,
        );
        setNotificationType('error');
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
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
        showNotificationMessage(
          `You need to look into why you couldn't POST: ${error}`,
        );
        setNotificationType('error');
      });
    setNewNote('');
  };

  const toggleImportanceOf = (id) => {
    console.log('id:', id);
    const note = notes.find((n) => n.id === id);
    console.log('note:', note);
    const changedNote = { ...note, important: !note.important };
    console.log('changedNote:', changedNote);

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

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
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
