import { useState, useEffect } from 'react';
import './app.css';
import Label from './components/Label';
import Button from './components/Button';
import Counter from './components/Counter';
import Stats from './components/Stats';

function App() {
  const [selected, setSelected] = useState(0);
  const [goodCounter, setGoodCounter] = useState(0);
  const [neutralCounter, setNeutralCounter] = useState(0);
  const [badCounter, setBadCounter] = useState(0);

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const addToGoodCounter = () => {
    setGoodCounter(goodCounter + 1);
  };
  const addToNeutralCounter = () => {
    setNeutralCounter(neutralCounter + 1);
  };
  const addToBadCounter = () => {
    setBadCounter(badCounter + 1);
  };

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * anecdotes.length);
    console.log(randomNum);
    setSelected(randomNum);
  }, [goodCounter, badCounter, neutralCounter]);

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
      <table>
        <tbody>
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
        </tbody>
      </table>
      <br />
      <div>{anecdotes[selected]}</div>
    </div>
  );
}

export default App;
