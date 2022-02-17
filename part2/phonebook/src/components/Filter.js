import Input from "./Input.js";

const filter = ({ value, handleFilterChage }) => (
  <Input
    id="filter"
    label="filter shown with:"
    type="search"
    value={value}
    onChange={handleFilterChage}
  />
);

export default filter;
