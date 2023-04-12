import { ALL_AUTHORS } from "../queries";
import { useQuery } from "@apollo/client";
import { v4 as uuid } from "uuid";

const Authors = (props) => {
  const results = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (results.loading) {
    return <div>loading...</div>;
  } else {
    console.log(results.data.allAuthors);
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {results.data.allAuthors.map((a) => (
            <tr key={`${a.name}_${uuid()}`}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
