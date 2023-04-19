import { useApolloClient, useQuery } from '@apollo/client';
import { useState } from 'react';
import PersonForm from './PersonForm';
import Persons from './Persons';
import { ALL_PERSONS } from './queries';
import Notify from './Notify.jsx';
import PhoneForm from './PhoneForm';
import LoginForm from './LoginForm';

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
  });
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  const handleNotify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm
          setToken={setToken}
          setError={handleNotify}
        />
      </>
    );
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>Logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={handleNotify} />
      <PhoneForm setError={handleNotify} />
    </div>
  );
};

export default App;
