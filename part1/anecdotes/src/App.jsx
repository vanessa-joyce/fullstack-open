import { useState } from 'react'
import Anecdote from './Anecdote'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const ANECDOTE_COUNT = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(ANECDOTE_COUNT).fill(0))
  const [highestVotedAnecdoteIndex, setHighestVotedAnecdoteIndex] = useState(0)

  const voteForAnecdote = () => { 
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy) 
    
    const maxVotesIndex = votesCopy.indexOf(Math.max(...votesCopy))
    setHighestVotedAnecdoteIndex(maxVotesIndex)
  }
  const showRandomAnecdote = () => { setSelected(Math.floor(Math.random()* ANECDOTE_COUNT)) }

  return (
    <>
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected] } />
      <div>
        <button onClick={voteForAnecdote}>vote</button>
        <button onClick={showRandomAnecdote}>next anecdote</button>
      </div>
    </div>
    <div>
      <h2>Anecdote with most votes</h2>
        <Anecdote anecdote={anecdotes[highestVotedAnecdoteIndex]} votes={votes[highestVotedAnecdoteIndex]} />
    </div>
    </>
  )
}

export default App