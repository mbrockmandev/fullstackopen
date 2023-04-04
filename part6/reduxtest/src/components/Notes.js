import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';

import React from 'react';

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);

  const importantNotes = useSelector((state) =>
    state.filter((n) => n.important),
  );

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
    <>
      <div className='container-important'>
        <p id='label-important'>Show Important</p>
        <button onClick={toggleShowImportant}>Show Important</button>
      </div>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleClick={() => dispatch(toggleImportanceOf(note.id))}
          />
        ))}
      </ul>
    </>
  );
};

export default Notes;
