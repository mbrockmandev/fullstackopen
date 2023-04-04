import { createNote, toggleImportanceOf } from './reducers/noteReducer';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);
  const importantNotes = useSelector((state) =>
    state.filter((n) => n.important),
  );

  const addNote = (e) => {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = '';
    dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  const toggleShowImportant = (e) => {
    e.preventDefault();
    const label = document.querySelector('#label-important');
    if (e.target.innerText === 'Show Important') {
      label.innerText = 'Show All';
      e.target.innerText = 'Show All';
    } else {
      label.innerText = 'Show Important';
      e.target.innerText = 'Show Important';
    }
  };

  return (
    <div>
      <p>Add Note:</p>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      <div className='container-important'>
        <p id='label-important'>Show Important</p>
        <button onClick={toggleShowImportant}>Show Important</button>
      </div>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
