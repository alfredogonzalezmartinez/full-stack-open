const Total = ({ contentList }) => {
  const totalExercises = contentList.reduce((total, { exercises }) => {
    return total + exercises;
  }, 0);

  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};

export default Total;
