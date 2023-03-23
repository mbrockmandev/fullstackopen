import React from 'react';

const Search = ({ query, handleQuery }) => {
  return (
    <div>
      Find Countries:
      <input
        value={query}
        onChange={handleQuery}
      />
    </div>
  );
};

export default Search;
