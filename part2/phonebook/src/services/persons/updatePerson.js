import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const updatePerson = (id, data) =>
  axios.put(`${baseUrl}/${id}`, data).then((response) => response.data);
