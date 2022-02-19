import { useEffect, useState } from "react";

import { getAllCountries } from "./services/countries/getAllCountries.js";

import Filter from "./components/Filter.js";
import Countries from "./components/Countries.js";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => getAllCountries().then((data) => setCountries(data)), []);

  const handleFilterChage = (event) => setFilter(event.target.value);

  const filteredCountries =
    filter === ""
      ? []
      : countries.filter(({ name }) =>
          name.common
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase().trim())
        );

  return (
    <div>
      <Filter value={filter} handleFilterChage={handleFilterChage} />
      {filteredCountries.length <= 10 ? (
        <Countries
          countries={filteredCountries}
          filter={filter}
          handleFilterChage={handleFilterChage}
        />
      ) : (
        <p>Too many maches, specify another filter</p>
      )}
    </div>
  );
}

export default App;
