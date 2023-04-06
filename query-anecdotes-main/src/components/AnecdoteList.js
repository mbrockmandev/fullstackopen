import { useDispatch, useSelector } from 'react-redux';
import { addVoteTo, initializeAnecdotes } from '../reducers/AnecdotesReducer';
import { show } from '../reducers/NotificationReducer';
import { useEffect } from 'react';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(initializeAnecdotes());
    };

    fetchData();
  }, [dispatch]);

  const handleVote = (anecdote) => {
    dispatch(addVoteTo(anecdote));
    dispatch(
      show({
        message: `You voted for ${anecdote.content}`,
        duration: 5000,
      }),
    );
  };

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
