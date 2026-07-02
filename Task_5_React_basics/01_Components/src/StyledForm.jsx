export const StyledForm = () => {
  return (
    <form className="styled-form">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" placeholder="Name" />
      <br />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="Email" />
    </form>
  );
};
