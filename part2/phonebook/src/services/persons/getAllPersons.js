import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const getAllPersons = () =>
  axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch(() => []);
