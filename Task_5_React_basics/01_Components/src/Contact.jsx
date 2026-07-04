import { ActionButton } from "./ActionButton";

export const Contact = () => {
  const handleClick = () => {
    console.log("Message sent!");
  };
  return (
    <div>
      <h2>Contact Us</h2>
      <ActionButton text="Send Message" onClick={handleClick} />
    </div>
  );
};
