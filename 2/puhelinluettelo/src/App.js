import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Filter = ({ search, handleSearchChange }) => {
  return (
    <>
      <label>filter shown with</label>
      <input type="search" value={search} onChange={handleSearchChange} />
    </>
  );
};

const NewPerson = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <label>name: </label>
      <input type="text" value={newName} onChange={handleNameChange} />

      <label>number:</label>
      <input type="tel" value={newNumber} onChange={handleNumberChange} />

      <button type="submit">add</button>
    </form>
  );
};

const Persons = ({ personsToShow }) => {
  return (
    <table>
      <tbody>
        {personsToShow.map((person) => (
          <tr key={person.name}>
            <td key={person.name}>{person.name}</td>
            <td key={person.number}>{person.number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    checkDoubles()
      ? setPersons(persons.concat(personObject))
      : alert(`${newName} is already added to phonebook`);

    setNewName('');
    setNewNumber('');
  };

  const checkDoubles = () =>
    persons.findIndex((element) => element.name === newName) < 0;

  /*Haku tehdään case-insensitiivisesti muuttamalla vertailua varten hakukohteiden
   nimet ja hakukentän tekstin lowercase-muotoon.*/
  const personsToShow = search.trim()
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  return (
    <main>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h3>Add new</h3>
      <NewPerson
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </main>
  );
};

export default App;
