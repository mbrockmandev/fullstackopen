import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const VisibilityFilter = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <input
        id='all'
        type='radio'
        name='filter'
        value='all'
        onChange={() => dispatch(filterChange('ALL'))}
      />
      <label htmlFor='all'>all</label>
      <input
        id='important'
        type='radio'
        name='filter'
        value='important'
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />
      <label htmlFor='important'>important</label>
      <input
        id='unimportant'
        type='radio'
        name='filter'
        value='unimportant'
        onChange={() => dispatch(filterChange('UNIMPORTANT'))}
      />
      <label htmlFor='unimportant'>unimportant</label>
    </div>
  );
};

export default VisibilityFilter;
