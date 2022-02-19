import Weather from "./Weather.js";

const Country = ({ country }) => {
  const { name, capital, population, languages, flags } = country;
  const languagesList = Object.entries(languages);

  return (
    <article>
      <h2>{name.common}</h2>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <section>
        <h3>languages</h3>
        <ul>
          {languagesList.map(([key, language]) => (
            <li key={key}>{language}</li>
          ))}
        </ul>
      </section>
      <img src={flags.png} alt={`${name.common} flag`} />
      <Weather city={capital} />
    </article>
  );
};

export default Country;
