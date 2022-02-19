import axios from "axios";

const dataUrl = "https://restcountries.com/v3.1/all";

export const getAllCountries = () =>
  axios
    .get(dataUrl)
    .then((response) => response.data)
    .catch(() => []);
