import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchPerson, setSearchPerson] = useState('');
  const [searchedPersons, setSearchedPersons] = useState([]);

  const hook = () => {
    const eventHandler = response => setPersons(response.data);
    const promise = axios.get('http://localhost:3001/persons');
    promise
      .then(eventHandler)
      .catch(err => console.log(err));
  }
  useEffect(hook, []);

  const addPerson = (e) => {
    e.preventDefault();
    const samePerson = persons.filter(({ name }) => {
      return name.toLocaleLowerCase() === newPerson.toLocaleLowerCase();
    });
    if (samePerson.length !== 0) {
      alert(`${newPerson} is already added to Phonebook.`);
      return;
    }
    const newPersonObject = {
      name: newPerson,
      number: newPhone
    }
    setPersons(persons.concat(newPersonObject));
    setNewPerson('');
    setNewPhone('');
  }

  const handleNameChange = (e) => setNewPerson(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleSearchChange = (e) => setSearchPerson(e.target.value);

  const hookSearch = () => {
    const personsFinded = persons.filter(({ name }) => {
      const regExp = new RegExp(searchPerson, 'gi');
      return regExp.test(name);
    });
    setSearchedPersons(personsFinded);
  }
  useEffect(hookSearch, [searchPerson, persons]);

  const personsToShow = searchedPersons.length > 0 ? searchedPersons : persons;

  return (
    <>
      <h2>Phonebook</h2>
      <Filter 
      handleChange={handleSearchChange} 
      searchPerson={searchPerson}
      />

      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newPerson={newPerson}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </>
  )
}

export default App;
