import { useQuery } from "@apollo/client";
import { useState } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import { ALL_PERSONS } from "./queries";
import Notify from "./Notify.jsx";
import PhoneForm from "./PhoneForm";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const handleNotify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={handleNotify} />
      <PhoneForm setError={handleNotify} />
    </div>
  );
};

export default App;
