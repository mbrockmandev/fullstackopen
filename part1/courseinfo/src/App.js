import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [filteredPeople, setFilteredPeople] = useState([]);

  const handleFilter = (e) => {
    const nameInput = e.target.value.toLowerCase();
    console.log('input:', nameInput);
    const filtered = persons.filter((person) => {
      return person.name.toLowerCase().includes(nameInput);
    });
    setFilteredPeople(filtered);
    console.log(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        handleFilter={handleFilter}
      />
      <h3>Add a new</h3>
      <PersonForm />
      <h2>Numbers</h2>
      <Persons persons={filteredPeople} />
    </div>
  );
};

export default App;
