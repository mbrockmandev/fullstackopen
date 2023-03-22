import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.querySelector('#name');
    const phone = e.target.querySelector('#phone');
    const result = persons.some((item) => item.name.includes(name.value));
    if (result) {
      alert(
        `Please enter a unique name. ${name.value} is already part of the phonebook.`,
      );
      return;
    }

    setPersons(persons.concat({ name: name.value, phone: phone.value }));
    name.value = '';
    phone.value = '';
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            id='name'
            placeholder='Enter a name.'
          />
        </div>
        <div>
          <div>
            number: <input id='phone' />
          </div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          const id = uuidv4();
          return (
            <li key={id}>
              {person.name} - {person.phone}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
