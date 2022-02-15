import Part from "./Part.js";

const Content = ({ parts }) => (
  <div>
    {parts.map(({ name, exercises, id }) => (
      <Part key={id}>
        {name} {exercises}
      </Part>
    ))}
  </div>
);

export default Content;
