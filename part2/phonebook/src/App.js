import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import personsService from './services/persons';
import Notification from './components/Notification';


const App = () => {

  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchPerson, setSearchPerson] = useState('');
  const [searchedPersons, setSearchedPersons] = useState([]);
  const [message, setMessage] = useState({info: null});

  useEffect(() => {
    const fakeContact = {
      name: 'im not a valid contact',
      number: '000-000-000',
      id: 1000
    }
    const handleRes = data => setPersons(data.concat(fakeContact));
    personsService.getAll().then(handleRes);
  }, []);

  const resetMessage = setState => setTimeout(() => setState({info: null}), 3500);
  
  const addPerson = (e) => {
    e.preventDefault();
    const samePerson = persons.filter(({ name }) => {
      return name.toLocaleLowerCase() === newPerson.toLocaleLowerCase();
    });
    if (samePerson.length > 0) {
      const personToUpdate = samePerson[0];
      const isSure = window.confirm(`${personToUpdate.name} is already added to Phonebook, replace the old number with a new one?`);
      
      if (!isSure) return;
      const handleRes = data => {
        setMessage({ info: `Updated ${data.name} phone`, success: true});
        setPersons(persons.map(item => item.id === data.id ? data : item));
        resetMessage(setMessage);
      }
      personsService.update(personToUpdate.id, { ...personToUpdate, number: newPhone })
        .then(handleRes)
        .catch(() => {
          setMessage({ info: `Information of ${personToUpdate.name} has already been removed from the server`, success: false});
          resetMessage(setMessage);
          setPersons(persons.filter(item => item.id !== personToUpdate.id));
        });
    } else {
      const newPersonObject = {
        name: newPerson,
        number: newPhone
      }
      personsService.create(newPersonObject).then((data) => {
        setMessage({ info: `Added ${data.name}`, success: true});
        setPersons(persons.concat(data));
        resetMessage(setMessage);
      });
    }
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
      personsService.deletePerson(person.id).then(handleRes).catch(() => {
        setMessage({ info: `the contact ${person.name} non exist on the server`, success: false});
        resetMessage(setMessage);
        setPersons(persons.filter(item => item.id !== person.id));
      });
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
      <Notification message={message}/>
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
