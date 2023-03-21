const Total = ({ exercises }) => {
  const sum = exercises.reduce((total, current) => total + current);
  return (
    <>
      <p>Number of exercises: {sum}</p>
    </>
  );
};

export default Total;
