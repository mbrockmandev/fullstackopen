import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleInput = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('#input');
    const result = persons.some((item) => item.name.includes(input.value));
    if (result) {
      alert(
        `Please enter a unique name. ${input.value} is already part of the phonebook.`,
      );
      input.value = '';
      return;
    }

    input.value = '';
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>debug: {newName}</div>
        <div>
          <input
            id='input'
            onChange={handleInput}
            placeholder='Enter a name.'
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          const id = uuidv4();
          return <li key={id}>{person.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
