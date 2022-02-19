const Persons = ({ list, handlePersonDelete }) => (
  <section>
    <h2>Numbers</h2>
    {list.map(({ name, number, id }) => (
      <p key={id}>
        {name} {number}{" "}
        <button value={id} onClick={handlePersonDelete}>
          delete
        </button>
      </p>
    ))}
  </section>
);

export default Persons;
