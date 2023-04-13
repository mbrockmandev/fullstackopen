import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { v4 as uuid } from "uuid";
import { useState } from "react";

const Authors = (props) => {
  const [newBorn, setNewBorn] = useState("");
  const [newName, setNewName] = useState("");

  const { data, loading } = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
    onError: (error) => {
      props.setError(error);
    },
  });

  const [updateBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newName !== "" && newBorn !== "") {
      updateBirthYear({ variables: { name: newName, born: newBorn } });
      setNewName("");
      setNewBorn("");
    }
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
          {data.allAuthors.map((a) => (
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
          <label>
            Name:
            <select name="selectedAuthor">
              {data.allAuthors.map((a) => (
                <option>{a.name}</option>
              ))}
            </select>
          </label>
          <div>
            Born:
            <input
              type="number"
              value={newBorn}
              onChange={({ target }) => setNewBorn(parseInt(target.value))}
            />
          </div>
          <button type="submit">update author info</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
