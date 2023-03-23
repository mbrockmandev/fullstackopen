import phonebookService from '../services/phonebook';

const PersonForm = ({ persons, setPersons }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.querySelector('#name');
    const number = e.target.querySelector('#number');

    const currentPerson = persons.find((person) => person.name === name.value);

    if (currentPerson && currentPerson.number === number) {
      alert(
        `Please enter a unique name. ${name.value} is already part of the phonebook. If you want to update the number, please enter a different number.`,
      );
      return;
    } else if (currentPerson) {
      if (
        window.confirm(
          `Would you like to update ${currentPerson.name}'s number?`,
        )
      ) {
        const updatedPerson = { ...currentPerson, number: number.value };
        updateDb(updatedPerson);
        setPersons((prevPersons) => [...prevPersons, updatedPerson]);
      }
    } else if (!currentPerson) {
      const newPerson = { name: name.value, number: number.value };
      addToDb(newPerson);
    }

    name.value = '';
    number.value = '';
  };

  const addToDb = (newPerson) => {
    phonebookService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
  };

  const updateDb = (updatedPerson) => {
    phonebookService.update(updatedPerson);
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
