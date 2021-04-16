import React from 'react';


const Person = ({ person }) => <li> {person.name}, {person.number} </li>;

const Persons = (props) => {
  return (
    <ul>
      {props.personsToShow.map(item => <Person key={item.name} person={item} />)}
    </ul>
  )
}

export default Persons;