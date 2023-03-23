import React, { useState } from 'react';
import phonebookService from '../services/phonebook';

const PersonForm = ({ persons, setPersons }) => {
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

    const newPerson = { name: name.value, number: number.value };
    addToDb(newPerson);
    name.value = '';
    number.value = '';
  };

  const addToDb = (newPerson) => {
    console.log(newPerson);
    phonebookService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
  };

  return (
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
          number: <input id='number' />
        </div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
