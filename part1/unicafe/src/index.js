import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Heading = ({title}) => <h2>{title}</h2>;

const Button = ({handleClick, content}) => {
  return(
    <button onClick={handleClick}>{content}</button>
  )
};

const Display = ({title, value}) => <span>{title}: <b>{value?value:0} </b></span>;

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  return(
    <div>
      <Display title='Good' value={good} />
      <Display title='Neutral' value={neutral} />
      <Display title='Bad' value={bad} />
      <br />
      <Display title='All' value={total} />
      <Display title='Average' value={good - bad / total} />
      <Display title='Positive' value={good / total} />
    </div>
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