import Input from "./Input";

const PersonForm = ({
  name,
  handleNameChage,
  number,
  handleNumberChage,
  handlePersonsAddition,
}) => (
  <section>
    <h2>add a new</h2>
    <form onSubmit={handlePersonsAddition}>
      <Input
        id="name"
        label="name:"
        type="text"
        value={name}
        onChange={handleNameChage}
      />
      <Input
        id="number"
        label="number:"
        type="tel"
        value={number}
        onChange={handleNumberChage}
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </section>
);

export default PersonForm;
