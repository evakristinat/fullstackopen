import React from 'react';

const Course = ({ course }) => {
  return (
    <>
      <Header header2={course.name} />
      <table>
        <Content parts={course.parts} />
      </table>
    </>
  );
};

export const Header = ({ header1, header2 }) => {
  return (
    <>
      <h1>{header1}</h1>
      <h2>{header2}</h2>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      <tbody>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </tbody>
      <tfoot>
        <Total parts={parts} />
      </tfoot>
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <tr>
      <td>
        <strong>Number of exercises</strong>
      </td>
      <td>
        <strong>{total}</strong>
      </td>
    </tr>
  );
};

const Part = ({ part }) => {
  return (
    <tr>
      <td>{part.name}</td>
      <td>{part.exercises}</td>
    </tr>
  );
};

export default Course;
