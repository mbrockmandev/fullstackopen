import React from 'react';

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

    setPersons(persons.concat({ name: name.value, number: number.value }));
    name.value = '';
    number.value = '';
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
