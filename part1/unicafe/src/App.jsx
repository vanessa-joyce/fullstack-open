import { useState } from 'react'

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
      <h2>statistics</h2>
      <div>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {getAll()}</div>
        <div>average {getAverage()}</div>
      </div>
    </div>
  )
}

export default App