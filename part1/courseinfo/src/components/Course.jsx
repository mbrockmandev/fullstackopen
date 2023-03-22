import React from 'react';

const Course = ({ course }) => {
  const sum = course.parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);

  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <li key={part.id}>
          {part.name} - {part.exercises}
        </li>
      ))}
      <li>total of {sum} exercises</li>
    </>
  );
};

export default Course;
