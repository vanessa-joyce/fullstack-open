import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({name: '', number: ''})
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  const handleDeleteClick = (id) => {
    const person = persons.find(person => person.id === id)
    if (!window.confirm(`Delete ${person.name}?`)) return
    phonebookService.remove(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
  const personsToShow = filterString ? filteredPersons : persons
  

  const addPerson = (event) => {
    event.preventDefault()
    if (checkIfPersonExists()) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }

    phonebookService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson({name: '', number: ''})

      })
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
       <Persons personsToShow={personsToShow} handleDeleteClick={handleDeleteClick} />
    </div>
  )
}

export default App