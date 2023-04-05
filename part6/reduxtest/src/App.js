import NewNote from './components/NewNote';
import VisibilityFilter from './components/VisibilityFilter';
import Notes from './components/Notes';
import noteService from './services/notes';
import { useEffect } from 'react';
import { setNotes } from './reducers/noteReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  }, [dispatch]);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
