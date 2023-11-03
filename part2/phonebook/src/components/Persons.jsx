const Persons = ({ isFiltering, persons, filteredPersons, handleDeletion }) => {
  const personTobeRender = isFiltering ? filteredPersons : persons;

  return personTobeRender.map((person) => (
    <div key={person.id}>
      <span>
        {person.name} {person.number}
      </span>
      <button
        onClick={() => {
          handleDeletion(person);
        }}
      >
        delete
      </button>
    </div>
  ));
};

export default Persons;
