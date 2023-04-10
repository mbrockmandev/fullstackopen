import React from "react";

type Props = {
  note: {
    id?: number;
    content?: string;
    important?: boolean;
    user?: string;
  } | null | undefined;
}

const Note = ({note}: Props) => {
  if (!note) return null;
  const content = note.content;
  const user = note.user;
  const important = note.important;

  return (
    <div>
      <h2>{content}</h2>
      <div>{user}</div>
      <div>
        <strong>{important ? 'important' : ''}</strong>
      </div>
    </div>
  );
};

export default Note;
