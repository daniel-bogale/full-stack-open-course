const Persons = ({ isFiltering, persons, filteredPersons }) => {
  return isFiltering
    ? filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))
    : persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ));
};

export default Persons;
