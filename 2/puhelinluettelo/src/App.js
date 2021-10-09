import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter';
import { NewPerson, Persons } from './components/Persons';
import Notification from './components/Notification';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setError(`The data from the server couldn't be reached`);
        notificationTimeOut(5);
      });
  }, []);

  const loadPersons = () => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setError(`The data from the server couldn't be reached`);
        notificationTimeOut(5);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const nameDoubles = () =>
    persons.findIndex((person) => person.name === newName.trim()) > -1;

  const numberDoubles = () =>
    persons.findIndex((person) => person.number === newNumber.trim()) > -1;

  const emptyInputs = () => {
    setNewName('');
    setNewNumber('');
  };

  const notificationTimeOut = (seconds = 5) => {
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, seconds * 1000);
  };

  /*Haku tehdään numeron perusteella jos search-kenttään syötetään numeroita.
    Jos numeroita ei ole, haku tehdään case-insensitiivisesti muuttamalla vertailua
    varten hakukohteiden nimet ja hakukentän tekstin lowercase-muotoon.*/
  const personsToShow = search.match(/\d/)
    ? persons.filter((person) => person.number.includes(search))
    : typeof search === 'string'
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  const removePerson = (event) => {
    const userId = parseInt(event.target.value);
    const selectedPerson = persons.find((person) => person.id === userId);

    window.confirm(`Delete ${selectedPerson.name} ?`)
      ? personsService
          .remove(userId)
          .then(() => {
            setPersons(persons.filter((person) => person.id !== userId));
            setMessage(`Successfully deleted ${selectedPerson.name}`);
            notificationTimeOut(3);
          })
          .catch((error) => {
            setError(
              'The person could not be found. Please refresh and retry.'
            );
            notificationTimeOut();
          })
      : console.log('Delete canceled');
  };

  /*addPerson lisää henkilön, mikäli tietoja ei ole jo lisätty ja muokkaa tietoja
  jos nimi on jo tiedoissa. */
  const addPerson = (event) => {
    event.preventDefault();
    /*henkilöt ladataan tässä kohtaa uudestaan varmistukseksi,
    että tietoja ei voi lisätä tuplana yhtä aikaa toisella selaimella.
    Tämän voisi toteuttaa myös muutamalla useEffectin päivitysehdon sopivaksi.
    Sillä itseasiassa korjattaisiin muitakin päivitykseen liittyviä bugeja.*/
    loadPersons();

    if (newName && newNumber) {
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
            setMessage(`${returnedPerson.name} was successfully added`);
            notificationTimeOut(3);
          })
          .catch((error) => {
            setError('No data could be found');
            notificationTimeOut(6);
          });
      } else if (nameDoubles() && !numberDoubles()) {
        //jos nimi esiintyy tuplana, mutta syötetty numero on uusi, kysytään halutaanko päivittää.
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with a new one?`
        )
          ? updatePerson(personObject.number, personObject.name)
          : console.log('canceled');
      } else if (!nameDoubles() && numberDoubles()) {
        //jos numero esiintyy tuplana, mutta nimi ei, ei lisäystä hyväksytä.
        setError(`Given phonenumber is already in use`);
        notificationTimeOut();
      } else if (nameDoubles() && numberDoubles()) {
        //jos mitkään ylläolevista ehdoista eivät täyty, molemmat tiedot ovat jo lisätty, eikä lisäystä hyväksytä.
        setError(`${newName.trim()} has already been added to phonebook`);
        notificationTimeOut();
      }
      emptyInputs();
    }
  };

  /*
  Etsii id:n kenttässä nimen perusteella ja päivittää sen perusteella
  oikean henkilön.
  */
  const updatePerson = (number, name) => {
    const id = persons.find((person) => person.name === name).id;
    const person = persons.find((n) => n.id === id);
    const changedPerson = { ...person, number: number };

    personsService
      .update(id, changedPerson)
      .then((response) => {
        if (response.status === 404) {
          /* axios ei ilmoita tilaa 404 virheenä, joten se on määritettävä
          sellaiseksi itse*/
          throw new Error('404');
        } else {
          setPersons(persons.map((n) => (n.id !== id ? n : response.data)));
          setMessage(`${person.name}'s number was successfully updated`);
        }
      })
      .catch((error) => {
        setError(`Information of ${person.name} has already been deleted`);
        notificationTimeOut(5);
      });
    emptyInputs();
  };

  return (
    <main>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
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
