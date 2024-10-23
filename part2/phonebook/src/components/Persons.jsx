const Persons = ({personsToShow}) => {
    return (
        <div>
        {personsToShow.map(person =>
            <div key={person.name}>{person.name} {person.number}</div>
          )}
        </div>
    )
}

export default Persons