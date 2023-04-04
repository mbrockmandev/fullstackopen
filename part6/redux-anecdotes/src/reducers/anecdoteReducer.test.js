import deepFreeze from 'deep-freeze';
import reducer from './anecdoteReducer';

describe('anecdote reducer', () => {
  const initialState = {
    0: { content: 'If it hurts, do it more often', id: 1, votes: 0 },
    1: {
      content: 'Adding manpower to a late software project makes it later!',
      id: 2,
      votes: 0,
    },
    2: {
      content:
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      id: 3,
      votes: 0,
    },
    3: {
      content:
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      id: 4,
      votes: 0,
    },
    4: {
      content: 'Premature optimization is the root of all evil.',
      id: 5,
      votes: 0,
    },
    5: {
      content:
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      id: 6,
      votes: 0,
    },
  };

  test('should load the items into state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = reducer(undefined, action);
    expect(newState[0].content).toEqual(initialState[0].content);
  });

  test('should increment likes when voting', () => {
    //
  });

  test('should allow for adding a new entry', () => {
    //
  });
});
