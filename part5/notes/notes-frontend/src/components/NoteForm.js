import { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    createNote({
      content: newNote,
      important: Math.random() > 0.5,
    });

    setNewNote('');
  };

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder='Write Note Content Here…'
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default NoteForm;
