export const Props = (props) => {
  console.log(props);
  return (
    <>
      <h3>
        {props.name} a.k.a {props.nickname}
      </h3>
    </>
  );
};
