import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAnecdotes, updateAnecdote } from './requests';

const App = () => {
  const queryClient = useQueryClient();

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
  });

  const voteForAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const handleVote = (anecdote) => {
    voteForAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (result.isLoading) {
    return <div>Loading data...</div>;
  } else if (result.status === 'error') {
    return (
      <div>Anecdote service not available due to problems with server.</div>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm props={result} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
