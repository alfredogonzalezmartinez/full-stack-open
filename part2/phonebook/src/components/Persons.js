const Persons = ({ list }) => (
  <section>
    <h2>Numbers</h2>
    {list.map(({ name, number }) => (
      <p key={name}>
        {name} {number}
      </p>
    ))}
  </section>
);

export default Persons;
