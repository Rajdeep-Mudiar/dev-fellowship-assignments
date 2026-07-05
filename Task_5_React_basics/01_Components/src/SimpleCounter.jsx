import { useState } from "react";

export const SimpleCounter = () => {
  const [count, setCount] = useState(0);
  console.log("Rendering SimpleCounter, count is:", count);
  const handleClick = () => {
    console.log("Before setCount, count is:", count);
    setCount(count + 1);
    console.log("Still in trigger phase . After setCount, count is:", count);
  };

  return (
    <>
      <button onClick={handleClick}>Increment</button>
      <h2>Counts: {count}</h2>
    </>
  );
};
