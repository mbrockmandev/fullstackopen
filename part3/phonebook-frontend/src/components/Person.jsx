const Person = ({ person, deletePerson }) => {
  if (!person) return null;

  return (
    <li>
      {person.name} {person.number}{' '}
      <button onClick={() => deletePerson(person.id)}>Delete</button>
    </li>
  );
};

export default Person;
