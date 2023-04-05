import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { showVoteNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

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
    await anecdoteService.vote(anecdote.id);
    dispatch(vote(anecdote.id));
    dispatch(showVoteNotification(anecdote.content));
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
