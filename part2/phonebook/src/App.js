import React, {useState} from 'react';


const App = () => {
  const [persons, setPersons] = useState([{name: 'Luis Perez'}]);
  const [newPerson, setNewPerson] = useState('');
  
  const addPerson = (e) => {
    e.preventDefault();
    if (!newPerson) return;
    
    const samePerson = persons.filter(item => item.name === newPerson);
    if (samePerson.length !== 0) {
      alert(`${newPerson} is already added to Phonebook.`);
      return;
    }
    
    const newPersonObject = {
      name: newPerson
    }
    setPersons(persons.concat(newPersonObject));
    setNewPerson('');
  }

  const handleNameChange = (e) => {
    setNewPerson(e.target.value);
  }

  return(
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <input onChange={handleNameChange} value={newPerson} />
        <button type='submit' >Add contact</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(item => <li key={item.name}>{item.name}</li>)}
      </ul>
    </>
  )
}

export default App;