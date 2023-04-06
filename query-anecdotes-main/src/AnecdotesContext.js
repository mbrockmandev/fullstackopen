// import { createContext, useReducer, useContext } from 'react';
// import { getAnecdotes, createAnecdote, updateAnecdote } from './requests';

// const initialState = {
//   loading: true,
//   data: [],
//   error: null,
// };

// const anecdotesReducer = (state, action) => {
//   console.log('state:', state);
//   console.log('action:', action);

//   switch (action.type) {
//     case 'GETALL':
//       try {
//         console.log('got here!');
//         const data = getAnecdotes();
//         console.log('DATA:', data);
//         return { loading: false, data, error: null };
//       } catch (error) {
//         return { loading: false, data: [], error: error.message };
//       }
//     case 'ADD':
//       try {
//         const newAnecdote = createAnecdote(action.payload);
//         return { loading: false, data: state.data.concat(newAnecdote) };
//       } catch (error) {
//         return { loading: false, data: state.data, error: error.message };
//       }
//     case 'VOTE':
//       try {
//         const updatedAnecdote = updateAnecdote(action.payload);
//         const updatedData = state.data.map((a) =>
//           a.id === updatedAnecdote.id ? updatedAnecdote : a,
//         );
//         return { loading: false, data: updatedData, error: null };
//       } catch (error) {
//         return { loading: false, data: state.data, error: error.message };
//       }
//     default:
//       return state;
//   }
// };

// const AnecdoteContext = createContext();

// export const AnecdoteContextProvider = (props) => {
//   const [anecdotes, dispatch] = useReducer(anecdotesReducer, initialState);

//   return (
//     <AnecdoteContext.Provider value={{ anecdotes, dispatch }}>
//       {props.children}
//     </AnecdoteContext.Provider>
//   );
// };

// export const useAnecdotes = () => {
//   const { anecdotes } = useContext(AnecdoteContext);
//   return anecdotes;
// };

// export const useAnecdotesDispatch = () => {
//   const { dispatch } = useContext(AnecdoteContext);
//   return dispatch;
// };

// export default AnecdoteContext;
