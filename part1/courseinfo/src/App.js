import { useState } from 'react';
import Display from './components/Display';
import Button from './components/Button';

const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = (e) => {
    setCounter(counter + 1);
  };

  const resetToZero = (e) => {
    setCounter(0);
  };

  const decreaseByOne = (e) => {
    setCounter(counter - 1);
  };

  return (
    <>
      <Display counter={counter} />
      <Button
        handleClick={increaseByOne}
        text='Plus'
      />
      <Button
        handleClick={resetToZero}
        text='Zero'
      />
      <Button
        handleClick={decreaseByOne}
        text='Minus'
      />
    </>
  );
};

export default App;
