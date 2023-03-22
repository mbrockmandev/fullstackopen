import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Persons = ({ persons }) => {
  return (
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
  );
};

export default Persons;
