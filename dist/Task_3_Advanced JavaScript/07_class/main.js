class Person {
  constructor(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
  }
  sayMyName() {
    return this.firstName + " " + this.lastName;
  }
}

const classP1 = new Person("Bruc", "Wayne");
console.log(classP1.sayMyName());

//Inheritance
class SuperHero extends Person {
  constructor(fName, lName) {
    super(fName, lName); //redirects to the Person class
    this.isSuperHero = true;
  }
  fightCrime() {
    console.log("Fighting Crime");
  }
}

const batman = new SuperHero("Abhinab", "Sharma");
console.log(batman.sayMyName());
