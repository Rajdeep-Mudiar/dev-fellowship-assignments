// Generator is a better approach for iterators

function normalFunction() {
  console.log("Hello");
  console.log("World");
}

normalFunction();
normalFunction();
function* generatorFunction() {
  yield `Hel`;
  yield `Wor`;
}

const generatorObject = generatorFunction(); //This generatorObject is an iterator . It can be used in for of loop
for (const word of generatorObject) {
  console.log(word);
}
