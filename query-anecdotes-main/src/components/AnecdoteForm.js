import anecdotesReducer from '../reducers/AnecdotesReducer';

const AnecdoteForm = () => {
  const generateId = () => {
    return (Math.random() * 100000).toFixed(0);
  };

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = {
      content,
      id: generateId(),
      votes: 0,
    };
    dispatch({ payload: newAnecdote, type: 'ADD' });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
