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
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
        setSuccessMessage(`${newPerson.name} is Modified`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000).catch((err) => {
          setErrorMessage(err.message);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      }
    } else {
      phonebookServices
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`${newPerson.name} is Added`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
      phonebookServices
        .deletePhoneBook(person.id)
        .then((res) => {
          setPersons((persons) =>
            persons.filter((per) => per.id !== person.id)
          );
          setSuccessMessage(`${person.name} is deleted`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
  };

  useEffect(() => {
    phonebookServices
      .getAll()
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          setPersons(res.data);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
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
