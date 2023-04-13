import { ALL_AUTHORS } from "../queries";
import { useQuery } from "@apollo/client";
import { v4 as uuid } from "uuid";

const Authors = (props) => {
  const results = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });

  if (!props.show) {
    return null;
  }

  if (results.loading) {
    return <div>loading...</div>;
  }
  // else if (results.error) {
  //   console.log(results);
  //   return <div style={{ color: "red" }}>Error: {results.error.message}</div>;
  // } else if (results.data) {
  //   console.log(results.data.allAuthors);
  //   console.log(typeof results.data.allAuthors[Symbol.iterator] === "function");
  // }

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
    </div>
  );
};

//               <td>{a.books}</td>

//   return (
//     <div>
//       <h2>books</h2>
//
//       <table>
//         <tbody>
//           <tr>
//             <th></th>
//             <th>author</th>
//             <th>published</th>
//           </tr>
//           {results.data.allBooks.map((a) => (
//             <tr key={a.title}>
//               <td>{a.title}</td>
//               <td>{a.author}</td>
//               <td>{a.published}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default Authors;
