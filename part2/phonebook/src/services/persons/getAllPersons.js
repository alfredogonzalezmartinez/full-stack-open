import axios from "axios";

const dataUrl = "http://localhost:3001/persons";

export const getAllPersons = () =>
  axios
    .get(dataUrl)
    .then((response) => response.data)
    .catch(() => []);
