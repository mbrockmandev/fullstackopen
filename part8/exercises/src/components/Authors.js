import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { v4 as uuid } from "uuid";
import { useState } from "react";

const Authors = (props) => {
  const [newBorn, setNewBorn] = useState("");
  const [newName, setNewName] = useState("");

  const results = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });

  const [updateBirthYear] = useMutation(EDIT_BIRTH_YEAR);

  if (!props.show) {
    return null;
  }

  if (results.loading) {
    return <div>loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    updateBirthYear({ variables: { name: newName, born: newBorn } });

    console.log(newName, newBorn, "submitted!");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Year born</th>
            <th># books</th>
            <th>Titles</th>
          </tr>
          {results.data.allAuthors.map((a) => (
            <tr key={`${a.name}_${uuid()}`}>
              <td>{a.name}</td>
              <td>{a.born ? a.born : "N/A"}</td>
              <td>{a.numOfBooks}</td>
              {a.books.map((b) => (
                <td>{b.title}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            Name:
            <input
              value={newName}
              onChange={({ target }) => setNewName(target.value)}
            />
          </div>
          <div>
            Born:
            <input
              type="number"
              value={newBorn}
              onChange={({ target }) => setNewBorn(parseInt(target.value))}
            />
          </div>
          <button type="submit">create book</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
