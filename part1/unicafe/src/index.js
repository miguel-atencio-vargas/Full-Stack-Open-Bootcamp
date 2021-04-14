import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Heading = ({title}) => <h2>{title}</h2>;
const Button = ({handleClick, content}) => <button onClick={handleClick}>{content}</button>
const Display = ({title, votes}) => <span>{title}: <b>{votes} </b></span>

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  return(
    <>
      <Heading title='Give some FEEDBACK!'/>
      <Button content='Good' handleClick={()=> setGood(good+1)}/>
      <Button content='Neutral' handleClick={()=> setNeutral(neutral+1)}/>
      <Button content='Bad' handleClick={()=> setBad(bad+1)}/>
      <Heading title='Statistics'/>
      <div>
        <Display title='Good' votes={good}/>
        <Display title='Neutral' votes={neutral}/>
        <Display title='Bad' votes={bad}/>
      </div>
    </>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))