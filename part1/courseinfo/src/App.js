import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  const getFromDb = () => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  useEffect(getFromDb, []);

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
      <PersonForm
        persons={persons}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
