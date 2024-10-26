import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({name: '', number: ''})
  const [filterString, setFilterString] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})

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

  const clearNotificationWithTimeout = () => {
    setTimeout(() => {
      setNotification({message: null, type: null})
    }, 5000)
  }

  const handleDeleteClick = (id) => {
    const person = persons.find(person => person.id === id)
    if (!window.confirm(`Delete ${person.name}?`)) return
    phonebookService.remove(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      setNotification({message: `Person ${person.name} was already removed from server`, type: 'error'})
      clearNotificationWithTimeout()
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
  const personsToShow = filterString ? filteredPersons : persons
  

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = checkIfPersonExists()
    if (existingPerson) {
      if (!window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) return
      phonebookService.update(existingPerson.id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person))
      })
      return
    }

    phonebookService.create(newPerson)
      .then(returnedPerson => {
        setNotification({message: `Added ${newPerson.name}`, type: 'success'})
        clearNotificationWithTimeout()
        setPersons(persons.concat(returnedPerson))
        setNewPerson({name: '', number: ''})

      })
  }

  const checkIfPersonExists = () => {
    return persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filterString={filterString} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleOnSubmit={addPerson} newPerson={newPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
       <Persons personsToShow={personsToShow} handleDeleteClick={handleDeleteClick} />
    </div>
  )
}

export default App