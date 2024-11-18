const Persons = ({ personsToShow, handleDeleteClick }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <div key={person.id}>{person.name} {person.number} <button onClick={() => handleDeleteClick(person.id)}>delete</button></div>
      )}
    </div>
  )
}

export default Persons