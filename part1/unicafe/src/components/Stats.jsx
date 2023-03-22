import React from 'react';

const Stats = ({ text, calculate, nums }) => {
  let result = 0;

  switch (calculate) {
    case 'sum':
      result = nums.goodCounter + nums.badCounter + nums.neutralCounter;
      break;
    case 'avg':
      result =
        (
          (nums.goodCounter /
            (nums.goodCounter + nums.badCounter + nums.neutralCounter)) *
          100
        ).toFixed(2) + '%';
      break;
    case 'pos':
      result =
        (
          (nums.goodCounter + nums.badCounter + nums.neutralCounter) /
          3
        ).toFixed(2) + '%';
      break;
    default:
      console.error(`Invalid calculation type: ${calculate}`);
      break;
  }

  return (
    <div>
      <h4>
        {text} - {result}
      </h4>
    </div>
  );
};

export default Stats;
