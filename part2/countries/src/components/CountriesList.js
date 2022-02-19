const CountriesList = ({ countries, handleFilterChage }) => (
  <section>
    {countries.map(({ name }) => (
      <p key={name.common}>
        {name.common}{" "}
        <button value={name.common} onClick={handleFilterChage}>
          show
        </button>
      </p>
    ))}
  </section>
);

export default CountriesList;
