const Total = ({ parts }) => {
  console.log(parts);
  return <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>;
};

export default Total;
