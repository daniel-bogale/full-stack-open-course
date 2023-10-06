import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleAddNumber = (e) => {
    e.preventDefault();

    const existingPersonWithTheSameName = persons.find(
      (person) => person.name === newName
    );
    console.log(existingPersonWithTheSameName);
    if (existingPersonWithTheSameName) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName };
      setPersons(persons.concat(newPerson));
      setNewName("");
    }
  };
  const onChangeHandler = (e) => {
    setNewName(e.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={onChangeHandler} />
        </div>
        <div>
          <button type="submit" onClick={handleAddNumber}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
