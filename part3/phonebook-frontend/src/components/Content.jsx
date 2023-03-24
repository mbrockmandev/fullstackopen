import React from 'react';
import Person from './Person';

const Content = ({ people, allPeople, deletePerson }) => {
  if (people.length === 0) {
    return (
      <ul>
        {allPeople.map((person, i) => (
          <Person
            key={i}
            person={person}
            deletePerson={deletePerson}
          />
        ))}
      </ul>
    );
  } else {
    return (
      <ul>
        {people.map((person, i) => (
          <Person
            key={i}
            person={person}
            deletePerson={deletePerson}
          />
        ))}
      </ul>
    );
  }
};

export default Content;
