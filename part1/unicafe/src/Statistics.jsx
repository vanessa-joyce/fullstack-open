import StatisticsLine from "./StatisticsLine";

const Statistics = ({good, bad, neutral, getAll, getAverage}) => {

  if (getAll() === 0) {
    return (
      <>
        <h2>statistics</h2>
        <div>No feedback given</div>
      </>
    )
  }
  return (      
    <>
    <h2>statistics</h2>
      <table>
        <tbody>
        <StatisticsLine value={good} text="good" />
        <StatisticsLine value={neutral} text="neutral" />
        <StatisticsLine value={bad} text="bad" />
        <StatisticsLine value={getAll()} text="all" />
        <StatisticsLine value={getAverage()} text="average" />
        </tbody>
      </table>
    </>
  )
}

export default Statistics;