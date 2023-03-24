const Total = ({ parts }) => {
  const totalExercises = parts.reduce((total, current) => {
    return total + current.exercises;
  }, 0);
  return (
    <>
      <p>Number of exercises: {totalExercises}</p>
    </>
  );
};

export default Total;
