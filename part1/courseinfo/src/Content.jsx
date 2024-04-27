import Part from "./Part";

const Content = ({parts}) => {
  console.log(parts);
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  );
};

export default Content;
