import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import phonebookService from '../services/phonebook';

const Persons = ({ persons, setPersons }) => {
  const deleteFromDb = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.remove(id);
      const updatedPersons = persons.filter((person) => person.id !== id);
      console.log(updatedPersons);
      setPersons(updatedPersons);
    }
  };

  return (
    <ul>
      {persons.map((person) => {
        const id = uuidv4();
        return (
          <li
            id='person'
            key={id}>
            {person.name} - {person.number}
            <button onClick={() => deleteFromDb(person.id, person.name)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
