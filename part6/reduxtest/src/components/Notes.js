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

  const filterSelected = (value) => {
    console.log(value);
  };

  const importantNotes = useSelector((state) =>
    state.filter((n) => n.important),
  );

  const unimportantNotes = useSelector((state) =>
    state.filter((n) => !n.important),
  );

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <>
      <div className='container-important'>
        all
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('ALL')}
        />
        important
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('IMPORTANT')}
        />
        unimportant
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('UNIMPORTANT')}
        />
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
