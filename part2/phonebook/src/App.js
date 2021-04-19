import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import personsService from './services/persons';


const App = () => {

  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchPerson, setSearchPerson] = useState('');
  const [searchedPersons, setSearchedPersons] = useState([]);

    useEffect(() => {
      const eventHandler = data => setPersons(data);
      personsService.getAll().then(eventHandler)
    }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const samePerson = persons.filter(({ name }) => {
      return name.toLocaleLowerCase() === newPerson.toLocaleLowerCase();
    });
    if (samePerson.length > 0) {
      alert(`${newPerson} is already added to Phonebook.`);
      return;
    }
    const newPersonObject = {
      name: newPerson,
      number: newPhone
    }
    personsService.create(newPersonObject).then((data) => {
      setPersons(persons.concat(data))
    })
    setNewPerson('');
    setNewPhone('');
  }

  const handleNameChange = (e) => setNewPerson(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleSearchChange = (e) => setSearchPerson(e.target.value);

  const deletePersonOf = (person) => {
    const handleRes = (status) => {
      if(status === 200) {
        setPersons(persons.filter(item => item.id !== person.id))
      }
    }
    const isSure = window.confirm(`Are you sure that you want delete ${person.name} contact`);
    if(isSure){
      personsService.deletePerson(person.id).then(handleRes);
    }
  }

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
      <ul>
        {personsToShow.map(item => {
          return(
            <Person 
              key={item.name} 
              person={item}
              deletePerson={deletePersonOf} />
          )
        })}
      </ul>
    </>
  )
}

export default App;
