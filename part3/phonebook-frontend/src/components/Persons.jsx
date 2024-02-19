const Persons = ({ isFiltering, persons, filteredPersons, handleDeletion }) => {
  const personTobeRender = isFiltering ? filteredPersons : persons;
  console.log(persons);
  return personTobeRender.map((person) => (
    <li key={person.id}>
      <span>
        {person.name} {person.phoneNumber}
      </span>
      <button
        onClick={() => {
          handleDeletion(person);
        }}
      >
        delete
      </button>
    </li>
  ));
};

export default Persons;
