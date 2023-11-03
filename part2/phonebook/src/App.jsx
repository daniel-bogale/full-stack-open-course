import { useEffect, useState } from "react";

import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
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
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          setPersons(response.data);
          setNewName("");
          setNewNumber("");
        });
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

  useEffect(() => {
    const promise = axios.get("http://localhost:3001/persons");
    promise.then((res) => {
      console.log(res);
      if (res.statusText === "OK") {
        setPersons(res.data);
      }
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onFilterChangeHandler={onFilterChangeHandler} />

      <h3>Add new contact</h3>

      <PersonForm
        nameInputValue={newName}
        numberInputValue={newNumber}
        onNameChangeHandler={onNameChangeHandler}
        onNumberChangeHandler={onNumberChangeHandler}
        handleAddNumber={handleAddNumber}
      />

      <h3>Numbers</h3>

      <Persons
        isFiltering={isFiltering}
        persons={persons}
        filteredPersons={filteredPersons}
      />
    </div>
  );
};

export default App;
