import { useState } from "react";

export const Counter = () => {
  // currentValue, setterFunction = useState(initialValue)
  const [count, setCount] = useState(() => {
    console.log("Counter initialized");
    return 0;
  });

  console.log("Counter rendered with count:", count);

  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  );
};
