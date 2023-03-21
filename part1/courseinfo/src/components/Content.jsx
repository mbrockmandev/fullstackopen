const Content = ({ parts }) => {
  return (
    <div>
      {parts &&
        parts.map((part) => (
          <p key={`${part.name}_${part.exercises}`}>
            {part.name} {part.exercises}
          </p>
        ))}
    </div>
  );
};

export default Content;
