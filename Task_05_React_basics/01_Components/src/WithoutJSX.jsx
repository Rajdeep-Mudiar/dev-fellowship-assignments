import React from "react";

// With JSX
export const HelloWorld = () => {
  return <div id="hello-world">Hello, World!</div>;
};

// Without JSX
export const HelloworldWithoutJSX = () => {
  return React.createElement(
    "hello-world",
    { id: "hello-world" },
    React.createElement("h1", null, "Hello, Rajdeep..This is without JSX"),
  );
};
