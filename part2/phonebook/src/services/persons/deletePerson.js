import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const deletePerson = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => response);
