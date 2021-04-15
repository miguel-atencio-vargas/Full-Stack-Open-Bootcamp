import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part}: {props.exercises} exercises</p>
  )
}

const Content = ({parts}) => {
  
  return (
    <div>
      {parts.map((item) => <Part key={item.id} part={item.name} exercises={item.exercises}/>)}
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((current, { exercises }) => exercises + current, 0);
  return (
    <p>Number of exercises: {total}</p>
  )
}
const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id:1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id:2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3,
      },
      {
        name: 'Another one',
        exercises: 10,
        id: 4,
      }
    ]
  };

  return <Course course={course}/>
}

ReactDOM.render(<App />, document.getElementById('root'));