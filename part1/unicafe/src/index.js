import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Heading = ({title}) => <h2>{title}</h2>;

const Button = ({handleClick, content}) => {
  return(
    <button onClick={handleClick}>{content}</button>
  )
};

const Statistic = ({title, value}) => {
  return(
    <tr>
      <td>{title}</td><td>{value ? value : 0}</td>
    </tr>
  )
};

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  if(total === 0) {
    return <p>No feedback give, please add some vote.</p>
  }
  return(
    <table>
        <tbody>
        <Statistic title='Good' value={good} />
        <Statistic title='Neutral' value={neutral} />
        <Statistic title='Bad' value={bad} />
        <Statistic title='All' value={total} />
        <Statistic title='Average' value={good - bad / total} />
        <Statistic title='Positive' value={good / total} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  return(
    <>
      <Heading title='Give some FEEDBACK!'/>
      <Button content='Good' handleClick={()=> setGood(good+1)}/>
      <Button content='Neutral' handleClick={()=> setNeutral(neutral+1)}/>
      <Button content='Bad' handleClick={()=> setBad(bad+1)}/>
      <Heading title='Statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))