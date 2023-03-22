import React from 'react';

const Counter = ({ label, counter }) => {
  return (
    <h4>
      {label} - {counter}
    </h4>
  );
};

export default Counter;
