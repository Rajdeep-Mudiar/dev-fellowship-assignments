export const Greetings = ({ name = "Rajdeep", message = "Hello" }) => {
  return (
    <div>
      <h3>
        {message}, {name}!
      </h3>
    </div>
  );
};
