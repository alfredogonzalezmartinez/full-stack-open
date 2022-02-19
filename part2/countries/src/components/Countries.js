import Country from "./Country";
import CountriesList from "./CountriesList";

const Countries = ({ countries, filter, handleFilterChage }) => {
  let countryIndex = 0;

  const countryFilter = ({ name }) =>
    name.common.toLocaleLowerCase() === filter.toLocaleLowerCase().trim();

  const getCountryIndex = () => countries.findIndex(countryFilter);

  const isFilterMatched = () => {
    if (countries.length === 1) return true;
    if (countries.some(countryFilter)) {
      countryIndex = getCountryIndex();
      return true;
    }
    return false;
  };

  return (
    <>
      {isFilterMatched() ? (
        <Country country={countries[countryIndex]} />
      ) : (
        <CountriesList
          countries={countries}
          handleFilterChage={handleFilterChage}
        />
      )}
    </>
  );
};

export default Countries;
