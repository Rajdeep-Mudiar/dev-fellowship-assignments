import { ActionButton } from "./ActionButton";

export const NewsLetter = () => {
  const handleSubscribe = () => {
    console.log("Subscribed to the newsletter!");
  };
  return (
    <div>
      <h2>Subscribe to our Newsletter</h2>
      <ActionButton text="Subscribe" onClick={handleSubscribe} />
    </div>
  );
};
