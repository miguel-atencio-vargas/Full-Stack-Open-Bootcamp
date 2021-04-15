import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const TopAnecdote = ({votes, anecdotes}) => {
  const topVotes = Math.max(...votes)
  const topIndex = votes.indexOf(topVotes);
  if(topVotes === 0) return <></>
  return(
    <>
      <p>{anecdotes[topIndex]}</p>
      <p>It has {topVotes} votes</p>
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  
  const handleClickNext = () => {
    const randomNumber = Math.abs(Math.ceil(Math.random() * 10) + (-4));
    setSelected(randomNumber)
  }

  const handleClickVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected]++;
    setVotes(copyVotes);
  }

  
  return(
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={handleClickVote}>Vote</button>
      <button onClick={handleClickNext}>Nex Anectdote</button>
      <TopAnecdote votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'Perfection (in design) is achieved not when there is nothing more to add, but rather when there is nothing more to take away', 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand', 'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));