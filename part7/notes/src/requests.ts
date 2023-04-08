import axios from 'axios';
import { NoteProps } from './interfaces/NoteProps';

const baseUrl = 'http://localhost:3001/notes';

export const getNotes = () => axios.get(baseUrl).then((res) => res.data);
export const createNote = (newNote: NoteProps) =>
  axios.post(baseUrl, newNote).then((res) => res.data);
export const updateNote = (updatedNote: NoteProps) =>
  axios
    .put(`${baseUrl}/${updatedNote.id}`, updatedNote)
    .then((res) => res.data);
