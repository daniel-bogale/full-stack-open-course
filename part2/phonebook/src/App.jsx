import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "39-33-3333030" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
