import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter';
import { NewPerson, Persons } from './components/Persons';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => alert(`The data from the server couldn't be reached`));
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

  const removePerson = (event) => {
    const userId = parseInt(event.target.value);
    const selectedPerson = persons.find((person) => person.id === userId);

    window.confirm(`Delete ${selectedPerson.name} ?`)
      ? personsService
          .remove(userId)
          .then(() =>
            setPersons(persons.filter((person) => person.id !== userId))
          )
          .catch((error) =>
            alert('The person could not be found. Please refresh and retry.')
          )
      : console.log('delete cancelled');
  };

  const addPerson = (event) => {
    event.preventDefault();
    console.log(event.target);

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    //jos nimi ja numero ovat uusia (ei tuplia) luodaan uusi henkilö
    if (!nameDoubles() && !numberDoubles()) {
      personsService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        })
        .catch((error) => alert('No data could be found'));
    } else if (nameDoubles() && !numberDoubles()) {
      //jos nimi esiintyy tuplana, mutta syötetty numero on uusi, kysytään halutaanko päivittää.
      window.confirm(
        `${newName.trim()} is already added to phonebook, replace the old number with a new one?`
      )
        ? updatePerson(personObject.number, personObject.name)
        : console.log('canceled');
    } else if (!nameDoubles() && numberDoubles()) {
      //jos numero esiintyy tuplana, mutta nimi ei, ei lisäystä hyväksytä.
      alert(`Given phonenumber is already in use`);
    } else if (nameDoubles() && numberDoubles()) {
      //jos mitkään ylläolevista ehdoista eivät täyty, molemmat tiedot ovat jo lisätty, eikä lisäystä hyväksytä.
      alert(`${newName.trim()} is already added to phonebook`);
    }
    emptyInputs();
  };

  /*
  Etsii id:n kenttässä tällä hetkellä olevan nimen perusteella ja
  päivittää sen perusteella oikean henkilön.
  */
  const updatePerson = (number, name) => {
    const id = persons.find((person) => person.name === name).id;
    const person = persons.find((n) => n.id === id);
    const changedPerson = { ...person, number: number };

    personsService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
        emptyInputs();
      })
      .catch((error) => alert('Update data could not be found'));
  };

  const nameDoubles = () =>
    persons.findIndex((person) => person.name === newName.trim()) > -1;

  const numberDoubles = () =>
    persons.findIndex((person) => person.number === newNumber.trim()) > -1;

  const emptyInputs = () => {
    setNewName('');
    setNewNumber('');
  };

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
      <Persons
        personsToShow={personsToShow}
        removePerson={removePerson}
        setPersons={setPersons}
      />
    </main>
  );
};

export default App;
