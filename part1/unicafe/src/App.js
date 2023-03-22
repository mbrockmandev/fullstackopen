import { useState } from 'react';
import Label from './components/Label';
import Button from './components/Button';
import Counter from './components/Counter';
import Stats from './components/Stats';

function App() {
  const [goodCounter, setGoodCounter] = useState(0);
  const [neutralCounter, setNeutralCounter] = useState(0);
  const [badCounter, setBadCounter] = useState(0);

  const addToGoodCounter = () => {
    setGoodCounter(goodCounter + 1);
  };
  const addToNeutralCounter = () => {
    setNeutralCounter(neutralCounter + 1);
  };
  const addToBadCounter = () => {
    setBadCounter(badCounter + 1);
  };

  return (
    <div className='App'>
      <Label text='give feedback' />
      <Button
        handleClick={addToGoodCounter}
        text='good'
      />
      <Button
        handleClick={addToNeutralCounter}
        text='neutral'
      />
      <Button
        handleClick={addToBadCounter}
        text='bad'
      />
      <Label text='statistics' />
      <Counter
        label='good'
        counter={goodCounter}
      />
      <Counter
        label='neutral'
        counter={neutralCounter}
      />
      <Counter
        label='bad'
        counter={badCounter}
      />
      <Stats
        text='all'
        calculate={'sum'}
        nums={{ goodCounter, neutralCounter, badCounter }}
      />
      <Stats
        text='average'
        calculate={'avg'}
        nums={{ goodCounter, neutralCounter, badCounter }}
      />
      <Stats
        text='positive'
        calculate={'pos'}
        nums={{ goodCounter, neutralCounter, badCounter }}
      />
    </div>
  );
}

export default App;
