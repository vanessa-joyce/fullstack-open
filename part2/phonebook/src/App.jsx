import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (checkIfPersonExists()) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {name: newName}
    setPersons([...persons, newPerson])
    setNewName('')
  }

  const checkIfPersonExists = () => {
    return persons.some(person => person.name === newName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {persons.map(person =>
          <div key={person.name}>{person.name}</div>
        )}
    </div>
  )
}

export default App