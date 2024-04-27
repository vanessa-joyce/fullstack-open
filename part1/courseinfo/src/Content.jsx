import Part from "./Part";

const Content = (props) => {
  console.log(props.parts);
  return (
    <>
      <Part part={props.parts.part1.name} exercises={props.parts.part1.exercises} />
      <Part part={props.parts.part2.name} exercises={props.parts.part2.exercises} />
      <Part part={props.parts.part3.name} exercises={props.parts.part3.exercises} />
    </>
  );
};

export default Content;
