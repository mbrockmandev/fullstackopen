import { useEffect, useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import phonebookService from './services/phonebook';
import Notification from './components/Notification';
import Content from './components/Content';

const App = () => {
  const [people, setPeople] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  const getFromDb = () => {
    phonebookService.getAll().then((prevPeople) => {
      setAllPeople(prevPeople);
    });
  };

  useEffect(getFromDb, []);

  const showNotification = (message, duration = 5000) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, duration);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const person = allPeople.filter((p) => p.name === newName);

    const newPerson = person[0];
    const updatedPerson = { ...newPerson, number: newNumber };

    if (person.length !== 0) {
      phonebookService
        .update(updatedPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setAllPeople(
            allPeople.map((person) =>
              person.id !== newPerson.id ? person : returnedPerson,
            ),
          );

          showNotification(`${updatedPerson.name} was successfully updated.`);
          setNotificationType('success');
        })
        .catch((error) => {
          setAllPeople(allPeople.filter((p) => p.id !== updatedPerson.id));
          showNotification(
            `Error: ${updatedPerson.name} was already deleted from the server.`,
          );
          setNotificationType('error');
        });
      setNewName('');
      setNewNumber('');
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      phonebookService
        .create(newPerson)
        .then((returnedPerson) => {
          setAllPeople([...allPeople, returnedPerson]);
          setNewName('');
          setNewNumber('');
          showNotification(`${newName} was successfully added!`);
          setNotificationType('success');
        })
        .catch((error) => {
          showNotification(`Error: ${error.response.data.error}`);
          setNotificationType('error');
        });
    }
  };

  const deletePerson = (id) => {
    const person = allPeople.filter((p) => p.id === id);
    console.log('person:', person[0]);
    const name = person[0].name;
    const personId = person[0].id;
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.remove(personId);
      showNotification(`${name} successfully deleted.`);
      setNotificationType('success');
      setAllPeople(allPeople.filter((p) => p.id !== personId));
    }
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filteredPeople = () =>
      allPeople.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()),
      );
    setPeople(filteredPeople);
  };

  return (
    <div>
      <Notification
        message={notificationMessage}
        type={notificationType}
      />
      <h2>Phonebook</h2>
      <Filter
        value={filter}
        handleFilter={handleFilterChange}
      />
      <h3>Add New Contact</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Content
        people={people}
        allPeople={allPeople}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
