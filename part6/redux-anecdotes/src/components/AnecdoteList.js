import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const filteredAnecdotes = anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter),
    );
    return filteredAnecdotes;
  });

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(setNotification(anecdote.content)); // need to troubleshoot this...
  };
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={handleVote}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
