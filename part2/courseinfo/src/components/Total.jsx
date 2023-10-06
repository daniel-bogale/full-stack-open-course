const Total = ({ parts }) => {
  const totalNumberOfExercises = parts.reduce(
    (tot, part) => tot + part.exercises,
    0
  );
  return <p>Total of {totalNumberOfExercises} exercises</p>;
};
export default Total;
