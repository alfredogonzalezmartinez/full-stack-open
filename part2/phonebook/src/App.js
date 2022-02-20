import React, { useEffect, useState } from "react";

import { getAllPersons } from "./services/persons/getAllPersons.js";
import { addNewPerson } from "./services/persons/addNewPerson.js";
import { updatePerson } from "./services/persons/updatePerson.js";
import { deletePerson } from "./services/persons/deletePerson.js";

import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm.js";
import Persons from "./components/Persons.js";
import Notification from "./components/Notification.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => getAllPersons().then((data) => setPersons(data)), []);

  const resetForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const handleNameChage = (event) => setNewName(event.target.value);
  const handleNumberChage = (event) => setNewNumber(event.target.value);
  const handleFilterChage = (event) => setFilter(event.target.value);

  const handleErrorStatus = (isError, message) => {
    setErrorStatus({ isError, message });
    setTimeout(() => {
      setErrorStatus(null);
    }, 5000);
  };

  const handleAddNewPerson = (newPerson) => {
    setPersons((prevPersons) => [...prevPersons, newPerson]);
    resetForm();
    handleErrorStatus(false, `Added ${newPerson.name}`);
  };

  const handleUpdatePerson = (updatedPerson) => {
    setPersons((prevPersons) =>
      prevPersons.map((person) =>
        person.id === updatedPerson.id ? updatedPerson : person
      )
    );
    resetForm();
    handleErrorStatus(false, `Updated phone number of ${updatedPerson.name}`);
  };

  const handlePersonsAddition = (event) => {
    event.preventDefault();

    if (newName === "") return alert("name is empty");
    if (newNumber === "") return alert("number is empty");

    const dataPerson = { name: newName, number: newNumber };
    const nameFilter = ({ name }) => name === newName;

    if (persons.some(nameFilter)) {
      const message = `${dataPerson.name} is alredy added to phonebook. Replace the old number with a new one?`;

      if (window.confirm(message)) {
        const { id } = persons.find(nameFilter);

        return updatePerson(id, dataPerson)
          .then((updatedPerson) => {
            handleUpdatePerson(updatedPerson);
          })
          .catch(
            handleErrorStatus(true, `Fail to update phone number of ${newName}`)
          );
      }
    }

    addNewPerson(dataPerson)
      .then((newPerson) => {
        handleAddNewPerson(newPerson);
      })
      .catch(() => handleErrorStatus(true, `Fail to add ${newName}`));
  };

  const handlePersonDelete = (event) => {
    const personId = Number.parseInt(event.target.value);
    const { name } = persons.find((person) => person.id === personId);

    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(personId)
        .then(() => {
          handleErrorStatus(false, `Deleted ${name}`);
        })
        .catch(() => {
          handleErrorStatus(
            true,
            `Information of ${name} has already been removed from server`
          );
        });

      setPersons((pervPersons) =>
        pervPersons.filter((person) => person.id !== personId)
      );
    }
  };

  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter(({ name }) =>
          name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        );

  return (
    <div>
      <h1>Phonebook</h1>
      {errorStatus && <Notification errorStatus={errorStatus} />}
      <Filter value={filter} handleFilterChage={handleFilterChage} />
      <PersonForm
        name={newName}
        handleNameChage={handleNameChage}
        number={newNumber}
        handleNumberChage={handleNumberChage}
        handlePersonsAddition={handlePersonsAddition}
      />
      <Persons list={filteredPersons} handlePersonDelete={handlePersonDelete} />
    </div>
  );
};

export default App;
