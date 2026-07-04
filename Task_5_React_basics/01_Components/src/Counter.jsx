export const Counter = () => {
  let count = 0;
  const handleClick = () => {
    count++;
    console.log(count);
  };
  return (
    <div>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  );
};
