import React from 'react';

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

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((item) =>
				(<Part key={item.id} part={item.name} exercises={item.exercises} />))}
		</div>
	)
}

const Total = ({ parts }) => {
	const total = parts.reduce((acc, { exercises }) => exercises + acc, 0);
	return (
		<h4>Number of exercises: {total}</h4>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course;