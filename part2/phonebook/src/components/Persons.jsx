const Persons = ({
  isFiltering,
  persons,
  filteredPersons,
  handleDeletion,
  errorMessage,
}) => {
  const personTobeRender = isFiltering ? filteredPersons : persons;

  if (errorMessage) {
    return <p className="error">{errorMessage}</p>;
  }
  return personTobeRender.map((person) => (
    <li key={person.id}>
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
    </li>
  ));
};

export default Persons;
