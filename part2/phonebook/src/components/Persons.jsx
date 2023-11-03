import phonebookServices from "../services/phonebook";

const Persons = ({ isFiltering, persons, filteredPersons, handleDeletion }) => {
  const personTobeRender = isFiltering ? filteredPersons : persons;

  return personTobeRender.map((person) => (
    <div>
      <span key={person.id}>
        {person.name} {person.number}
      </span>
      <button
        onClick={() => {
          handleDeletion(person)
        }}
      >
        delete
      </button>
    </div>
  ));
};

export default Persons;
