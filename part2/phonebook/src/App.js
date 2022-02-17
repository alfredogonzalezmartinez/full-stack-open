import React, { useState } from "react";

import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm.js";
import Persons from "./components/Persons.js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChage = (event) => setNewName(event.target.value);
  const handleNumberChage = (event) => setNewNumber(event.target.value);
  const handleFilterChage = (event) => setFilter(event.target.value);
  const handlePersonsAddition = (event) => {
    event.preventDefault();

    if (newName === "") return alert("name is empty");
    if (newNumber === "") return alert("number is empty");
    if (persons.some(({ name }) => name === newName))
      return alert(`${newName} is already added to phonebook`);

    setPersons((prevPersons) => [
      ...prevPersons,
      { name: newName, number: newNumber },
    ]);
    setNewName("");
    setNewNumber("");
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
      <Filter value={filter} handleFilterChage={handleFilterChage} />
      <PersonForm
        name={newName}
        handleNameChage={handleNameChage}
        number={newNumber}
        handleNumberChage={handleNumberChage}
        handlePersonsAddition={handlePersonsAddition}
      />
      <Persons list={filteredPersons} />
    </div>
  );
};

export default App;
