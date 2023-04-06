import { useDispatch, useSelector } from 'react-redux';
import {} from '../reducers/AnecdotesReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    return state.anecdotes;
  });

  const handleVote = (anecdote) => {
    dispatch({ payload: anecdote, type: 'VOTE' });
  };

  if (anecdotes) {
    console.log('anecdotes:', anecdotes);
    return null;
  }

  return (
    <>
      {anecdotes &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
