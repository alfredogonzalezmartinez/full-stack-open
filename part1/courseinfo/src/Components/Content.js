import Part from "./Part.js";

const Content = ({ parts }) => (
  <div>
    {parts.map(({ name, exercises }, key) => (
      <Part key={key}>
        {name} {exercises}
      </Part>
    ))}
  </div>
);

export default Content;
