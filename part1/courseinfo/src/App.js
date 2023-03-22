import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data));
  };

  useEffect(hook, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        handleFilter={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
