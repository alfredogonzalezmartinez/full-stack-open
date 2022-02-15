import Content from "./Content.js";
import Header from "./Header.js";
import Total from "./Total.js";

const Course = ({ course }) => {
  const { name, parts } = course;

  const totalExercises = parts.reduce((total, { exercises }) => {
    return total + exercises;
  }, 0);

  return (
    <div>
      <Header>{name}</Header>
      <Content parts={parts} />
      <Total value={totalExercises} />
    </div>
  );
};

export default Course;
