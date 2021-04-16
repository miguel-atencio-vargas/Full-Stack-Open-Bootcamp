import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Luis Perez', number: '12222333' }, 
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [newPerson, setNewPerson] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchedPersons, setSearchedPersons] = useState([]);
  const [thereIsAnInput, setThereIsAnInput] = useState(false);
  
  const addPerson = (e) => {
    e.preventDefault();
    const samePerson = persons.filter(({name}) => {
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
  const handleSearchChange = (e) => {
    if (e.target.value.length > 0) {
      setThereIsAnInput(true);
      
      const personsFinded = persons.filter(({ name }) => {
        const regExp = new RegExp(e.target.value, 'gi');
        return regExp.test(name)
      });

      setSearchedPersons(personsFinded);
    } else {
      setThereIsAnInput(false);
      setSearchedPersons([])
    }
  }


  const personsToShow =  thereIsAnInput ? searchedPersons:persons;

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handleChange={handleSearchChange}/>
      <PersonForm 
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newPerson={newPerson}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </>
  )
}

export default App;