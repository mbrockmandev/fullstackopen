import React from 'react';

const Filter = ({ handleFilter }) => {
  return (
    <div>
      Filter shown with
      <input
        id='filter'
        onChange={handleFilter}
      />
    </div>
  );
};

export default Filter;
