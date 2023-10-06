import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filterBy, setFilterBy] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleAddNumber = (e) => {
    e.preventDefault();

    const existingPersonWithTheSameName = persons.find(
      (person) => person.name === newName
    );
    if (existingPersonWithTheSameName) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
    }
  };
  const onNameChangeHandler = (e) => {
    setNewName(e.target.value);
  };
  const onNumberChangeHandler = (e) => {
    setNewNumber(e.target.value);
  };
  const onFilterChangeHandler = (e) => {
    if (e.target.value) {
      setIsFiltering(true);
      const filteredPersons = persons.filter((persons) =>
        persons.name.toLocaleLowerCase().includes(e.target.value)
      );
      setFilteredPersons(filteredPersons);
    } else {
      setIsFiltering(false);
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with
        <input type="text" onChange={onFilterChangeHandler} />
      </div>

      <h2>Add new contact</h2>
      <form>
        <div>
          name: <input onChange={onNameChangeHandler} />
        </div>
        <div>
          number: <input onChange={onNumberChangeHandler} />
        </div>
        <div>
          <button type="submit" onClick={handleAddNumber}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>

      {isFiltering
        ? filteredPersons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  );
};

export default App;
