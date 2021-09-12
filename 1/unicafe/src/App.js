import React, { useState } from 'react';
import './App.css';

const Header = (props) => <h1>{props.text}</h1>;

const Button = (props) => (
  <button class="button" onClick={props.handleClick}>{props.text}</button>
);

const Statistics = (props) => {
  const avg = (arr, total) => arr.reduce((a, b) => a + b, 0) / total;
  if (props.all.length > 0) {
    return (
      <table id="statistics">
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all.length} />
          <StatisticLine
            text="average"
            value={avg(props.all, props.all.length).toFixed(1)}
          />
          <StatisticLine
            text="positive"
            value={((props.good / props.all.length) * 100).toFixed(1)}
            symbol="%"
          />
        </tbody>
      </table>
    );
  }
  return <p>No feedback given</p>;
};

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>
      {props.value} {props.symbol}
    </td>
  </tr>
);

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState([]);

  return (
    <div id="app">
      <Header text="give feedback" />
      <section id="feedback">
        <Button
          handleClick={() => {
            setGood(good + 1);
            setAll(all.concat(1));
          }}
          text="good"
        />
        <Button
          handleClick={() => {
            setNeutral(neutral + 1);
            setAll(all.concat(0));
          }}
          text="neutral"
        />
        <Button
          handleClick={() => {
            setBad(bad + 1);
            setAll(all.concat(-1));
          }}
          text="bad"
        />
      </section>
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
