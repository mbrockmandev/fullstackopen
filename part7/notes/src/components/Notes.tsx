import React from 'react';
import { Link } from 'react-router-dom';
import { NoteProps } from '../interfaces/NoteProps';

type Props = {
  notes: NoteProps[];
}

const Notes = ({ notes }: Props) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map((note) => (
        <li key={note?.id}>
          <Link to={`/notes/${note?.id}`}>{note?.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Notes;
