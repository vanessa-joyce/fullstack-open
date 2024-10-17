import { useState } from 'react'
import Statistics from './Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)
  const getAll = () => good + neutral + bad
  const getAverage = () => {
    if (getAll() === 0) { return 0 }
    return ((good * 1) + (bad * -1)) / getAll()
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} getAll={getAll} getAverage={getAverage} />
    </div>
  )
}

export default App