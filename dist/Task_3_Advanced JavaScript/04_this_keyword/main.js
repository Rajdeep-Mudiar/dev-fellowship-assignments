// Implicit Binding

const person = {
  name: "Rajdeep",
  sayMyName: function () {
    console.log(`My name is ${this.name}`);
  },
};

// person.sayMyName();

// Explicit Binding
function sayMyName() {
  console.log(`My name is ${this.name}`);
}
// sayMyName.call(person);

// new Binding
function Person(name) {
  this.name = name;
}
const p1 = new Person("Rajdeep");
const p2 = new Person("Ankur");
console.log(p1.name, p2.name);

//Default Binding
globalThis.name = "Superman";
function sayMyName() {
  console.log(`My friend is ${this.name}`);
}
