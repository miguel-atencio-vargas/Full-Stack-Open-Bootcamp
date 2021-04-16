import React from 'react';

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <h2>Add a new:</h2>
      <p>
        <label>Name: </label>
        <input onChange={props.handleNameChange} value={props.newPerson} required />
      </p>
      <p>
        <label>Number: </label>
        <input onChange={props.handlePhoneChange} value={props.newPhone} required />
      </p>
      <button type='submit'>Add contact</button>
    </form>
  )
}

export default PersonForm;