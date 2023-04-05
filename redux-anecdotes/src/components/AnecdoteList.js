import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const filteredAnecdotes = anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter),
    );
    return filteredAnecdotes;
  });

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const handleVote = async (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(showNotification(`You voted for ${anecdote.content}`, 5));
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
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
