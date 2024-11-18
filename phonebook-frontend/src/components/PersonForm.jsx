const PersonForm = ({ handleOnSubmit, newPerson, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <div>name: <input value={newPerson.name} onChange={handleNameChange} /></div>
        <div>number: <input value={newPerson.number} onChange={handleNumberChange} /></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm