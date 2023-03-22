import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [filteredPeople, setFilteredPeople] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.querySelector('#name');
    const number = e.target.querySelector('#number');
    const result = persons.some((item) => item.name.includes(name.value));
    if (result) {
      alert(
        `Please enter a unique name. ${name.value} is already part of the phonebook.`,
      );
      return;
    }

    setPersons(persons.concat({ name: name.value, number: number.value }));
    name.value = '';
    number.value = '';
  };

  const handleFilter = (e) => {
    const nameInput = e.target.value.toLowerCase();
    console.log('input:', nameInput);
    const filtered = persons.filter((person) => {
      return person.name.toLowerCase().includes(nameInput);
    });

    setFilteredPeople(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input id='filter' />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            id='name'
            placeholder='Enter a name.'
            onChange={handleFilter}
          />
        </div>
        <div>
          <div>
            number: <input id='number' />
          </div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPeople.length > 0 ? (
        <ul>
          {filteredPeople.map((person) => {
            const id = uuidv4();
            return (
              <li key={id}>
                {person.name} - {person.number}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul>
          {persons.map((person) => {
            const id = uuidv4();
            return (
              <li key={id}>
                {person.name} - {person.number}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default App;
