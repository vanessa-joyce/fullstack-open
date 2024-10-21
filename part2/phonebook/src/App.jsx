import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: newName}
    setPersons([...persons, newPerson])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(event) => {setNewName(event.target.value)}} />
        </div>
        <div>
          <button type="submit" onClick={(event) => addPerson(event)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {persons.map(person =>
          <div>{person.name}</div>
        )}
    </div>
  )
}

export default App