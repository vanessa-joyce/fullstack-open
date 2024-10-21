import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '079 549 44 18' }
  ]) 

  const [newPerson, setNewPerson] = useState({name: '', number: ''})

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (checkIfPersonExists()) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }
    setPersons([...persons, newPerson])
    setNewPerson({name: '', number: ''})
  }

  const checkIfPersonExists = () => {
    return persons.some(person => person.name === newPerson.name)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>name: <input value={newPerson.name} onChange={handleNameChange} /></div>
          <div>number: <input value={newPerson.number} onChange={handleNumberChange} /></div>
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