const Persons = ({ isFiltering, persons, filteredPersons }) => {
  const personTobeRender = isFiltering ? filteredPersons : persons;

  return personTobeRender.map((person) => (
    <div>
      <span key={person.id}>
        {person.name} {person.number}
      </span>
      <button
        onClick={() => {
          console.log(person.id);
        }}
      >
        delete
      </button>
    </div>
  ));
};

export default Persons;
