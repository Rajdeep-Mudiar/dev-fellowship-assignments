export const CustomButton = ({ text }) => {
  const name = "Codevolution";

  const handleClick = (e) => {
    console.log("Button Clicked", e);
    console.log("Clicked elment", e.target);
    console.log("Click coordinates", e.clientX, e.clientY);
    console.log("Which button clicked", e.button);

    console.log(`Hey ${name}, you clicked the ${text} button!`);
  };

  return <button onClick={handleClick}>{text}</button>;
};
