import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const addNewPerson = (person) =>
  axios.post(baseUrl, person).then((response) => response.data);
