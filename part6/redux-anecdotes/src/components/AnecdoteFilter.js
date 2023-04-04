import { setFilter } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const handleInput = (e) => {
    console.log('FILTER: ', e.target.value);
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      Filter:
      <input
        type='text'
        name='filter'
        onChange={handleInput}
      />
    </div>
  );
};

export default AnecdoteFilter;
