import React from 'react';

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <table>
      <Header course={course}></Header>
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      ></Content>
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      ></Total>
    </table>
  );
};

const Header = (props) => {
  return (
    <thead>
      <th>
        <h1>{props.course}</h1>
      </th>
    </thead>
  );
};

const Content = (props) => {
  return (
    <tbody>
      <Part part={props.part1} exercises={props.exercises1}></Part>
      <Part part={props.part2} exercises={props.exercises2}></Part>
      <Part part={props.part3} exercises={props.exercises3}></Part>
    </tbody>
  );
};

const Total = (props) => {
  return (
    <tfoot>
      <tr>
        <td>Number of exercises </td>
        <td>{props.exercises1 + props.exercises2 + props.exercises3}</td>
      </tr>
    </tfoot>
  );
};

const Part = (props) => {
  return (
    <tr>
      <td>{props.part}</td>
      <td>{props.exercises}</td>
    </tr>
  );
};

export default App;
