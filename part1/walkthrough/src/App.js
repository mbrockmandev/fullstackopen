import './App.css';

const Hello = (props) => {
  console.log(props);
  return (
    <div>
      Hello {props.name}, you are {props.age} years old!
    </div>
  );
};

const App = () => {
  const name = 'Peter';
  const age = 12;
  return (
    <div>
      <h1>Greetings</h1>
      <p>
        <Hello
          name='Maya'
          age={26 + 10}
        />
      </p>
      <p>
        <Hello
          name={name}
          age={age}
        />
      </p>
    </div>
  );
};

export default App;
