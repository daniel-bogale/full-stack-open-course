import { useEffect, useState } from "react";

import axios from "axios";

import phonebookServices from "./services/phonebook";

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

    const newPerson = { name: newName, number: newNumber };

    const existingPersonWithTheSameName = persons.find(
      (person) => person.name === newName
    );
    if (existingPersonWithTheSameName) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        setNewName("");
        setNewNumber("");
        phonebookServices.update(existingPersonWithTheSameName.id, newPerson);
      }
    } else {
      phonebookServices.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
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
  const onDeletion = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      phonebookServices.deletePhoneBook(person.id).then((res) => {
        setPersons((persons) => persons.filter((per) => per.id !== person.id));
      });
  };

  useEffect(() => {
    phonebookServices.getAll().then((res) => {
      console.log(res);
      if (res.statusText === "OK") {
        setPersons(res.data);
      }
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter onFilterChangeHandler={onFilterChangeHandler} />

      <h2>Add new contact</h2>

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
        handleDeletion={onDeletion}
      />
    </div>
  );
};

export default App;
