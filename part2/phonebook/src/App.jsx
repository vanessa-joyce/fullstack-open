import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '079 549 44 18' }
  ]) 

  const [newPerson, setNewPerson] = useState({name: '', number: ''})
  const [filterString, setFilterString] = useState('')

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
  const personsToShow = filterString ? filteredPersons : persons
  

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
    return persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterString={filterString} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleOnSubmit={addPerson} newPerson={newPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
       <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App