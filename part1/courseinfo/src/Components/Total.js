const Total = ({ parts }) => {
  const totalExercises = parts.reduce((total, { exercises }) => {
    return total + exercises;
  }, 0);

  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};

export default Total;
