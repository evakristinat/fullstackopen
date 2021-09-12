import React from 'react';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}></Header>
      <table>
        <Content parts={course.parts}></Content>
        <Total parts={course.parts}></Total>
      </table>
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <tbody>
      <Part part={props.parts[0]}></Part>
      <Part part={props.parts[1]}></Part>
      <Part part={props.parts[2]}></Part>
    </tbody>
  );
};

const Total = (props) => {
  return (
    <tfoot>
      <tr>
        <td>Number of exercises </td>
        <td>
          {props.parts[0].exercises +
            props.parts[1].exercises +
            props.parts[2].exercises}
        </td>
      </tr>
    </tfoot>
  );
};

const Part = (props) => {
  return (
    <tr>
      <td>{props.part.name}</td>
      <td>{props.part.exercises}</td>
    </tr>
  );
};

export default App;
