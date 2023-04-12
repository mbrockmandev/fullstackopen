import { gql, useQuery } from "@apollo/client";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} /> <PersonForm />
    </div>
  );
};

export default App;
