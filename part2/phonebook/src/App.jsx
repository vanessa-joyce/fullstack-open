import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '079 549 44 18' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (checkIfPersonExists()) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {name: newName, number: newNumber}
    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  const checkIfPersonExists = () => {
    return persons.some(person => person.name === newName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>name: <input value={newName} onChange={handleNameChange} /></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {persons.map(person =>
          <div key={person.name}>{person.name} {person.number}</div>
        )}
    </div>
  )
}

export default App