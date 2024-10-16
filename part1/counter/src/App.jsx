import { useState } from 'react'
import History from './History'
import Button from './Button'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = (number) => () => {
    setAll(allClicks.concat('L'))
    setTotal(total + number);
    setLeft(left + number)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setTotal(total + 1);
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick(2)} text="left"/>
      <Button handleClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}

export default App