import { useState } from "react";

export const SimpleCounter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Before setCount, count is:", count);
    setCount(count + 1);
    console.log("After setCount, count is:", count);
  };

  return (
    <>
      <button onClick={handleClick}>Increment</button>
      <h2>Counts: {count}</h2>
    </>
  );
};
