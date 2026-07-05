import { useState } from "react";

export const Usestate = () => {
  const [user, setUser] = useState({
    name: "Rajdeep Mudiar",
    age: 30,
    email: "rajdeepmudiar06@gmail.com",
    address: {
      City: "Guwahati",
      country: "India",
    },
  });

  console.log("Rendering Usestate, user is:", user);
  const updateName = () => {
    setUser((prevUser) => ({
      ...prevUser,
      name: "Clark Kent",
    }));
  };

  const updateAge = () => {
    setUser({
      ...user,
      age: user.age + 1,
    });
  };

  const updateMultiple = () => {
    setUser({
      ...user,
      name: "Bruce Wayne",
      age: user.age + 1,
    });
  };

  const updateCity = () => {
    setUser({
      ...user,
      address: {
        ...user.address,
        City: "Metropolis",
      },
    });
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age:{user.age}</p>
      <p>Email: {user.email}</p>
      <p>City: {user.address.City}</p>
      <p>Country: {user.address.country}</p>
      <button onClick={updateName}>Update Name</button>
      <button onClick={updateAge}>Increase Age by 1</button>
      <button onClick={updateMultiple}> Update name and age </button>
      <button onClick={updateCity}>Move to Metropolis</button>
    </div>
  );
};
