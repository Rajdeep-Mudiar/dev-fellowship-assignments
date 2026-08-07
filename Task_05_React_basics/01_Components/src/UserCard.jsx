import { UserInfo } from "./Greetings";

export const UserCard = ({ name, ...rest }) => {
  return (
    <div>
      <h2>{name}</h2>
      <UserInfo {...rest} />
    </div>
  );
};
