import Input from "./Input.js";

const filter = ({ value, handleFilterChage }) => (
  <Input
    id="filter"
    label="find countries:"
    type="search"
    value={value}
    onChange={handleFilterChage}
  />
);

export default filter;
