import { EventEmitter } from "events";

const myEmitter = new EventEmitter(); // creates an EventEmitter object

function greetHandler(name) {
  console.log("Hello " + name);
}

function goodbyeHandler(name) {
  console.log("Bye " + name);
}

// Register event listeners
myEmitter.on("greet", greetHandler);
myEmitter.on("bye", goodbyeHandler);

// Emit events
myEmitter.emit("greet", "Raj");
myEmitter.emit("bye", "Raj");

// Error handling
myEmitter.on("error", (err) => {
  console.log("An Error Occured:", err);
});

// Simulate error
myEmitter.emit("error", new Error("Something went wrong"));
