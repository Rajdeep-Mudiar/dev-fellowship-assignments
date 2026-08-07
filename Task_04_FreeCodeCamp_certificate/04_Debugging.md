# New Learnings from this course

## 1. Displaying msg

console.log("Hello World");
console.warn("Hello World");
console.clear();

## 2. typeof()

console.log(typeof "");
console.log(typeof 0);
console.log(typeof []);
console.log(typeof {});

In order, the console will display the strings string, number, object, and object.

JavaScript recognizes seven primitive (immutable) data types: Boolean, Null, Undefined, Number, String, Symbol (new with ES6), and BigInt (new with ES2020), and one type for mutable items: Object. Note that in JavaScript, arrays are technically a type of object.

## 3. Power

Math.pow(b, e) --> b: base , e: exponent

## 4. Use Caution When Reinitializing Variables Inside a Loop

Sometimes it's necessary to save information, increment counters, or re-set variables within a loop. A potential issue is when variables either should be reinitialized, and aren't, or vice versa. This is particularly dangerous if you accidentally reset the variable being used for the terminal condition, causing an infinite loop.

Printing variable values with each cycle of your loop by using console.log() can uncover buggy behavior related to resetting, or failing to reset a variable.

Task
The following function is supposed to create a two-dimensional array with m rows and n columns of zeroes. Unfortunately, it's not producing the expected output because the row variable isn't being reinitialized (set back to an empty array) in the outer loop. Fix the code so it returns a correct 3x2 array of zeroes, which looks like [[0, 0], [0, 0], [0, 0]].

Tests:
Failed:1. Your code should set the matrix variable to an array holding 3 rows of 2 columns of zeroes each.
Passed:2. The matrix variable should have 3 rows.
Failed:3. The matrix variable should have 2 columns in each row.
Failed:4. zeroArray(4,3) should return an array holding 4 rows of 3 columns of zeroes each.

Solution
function zeroArray(m, n) {
// Creates a 2-D array with m rows and n columns of zeroes
let newArray = [];

for (let i = 0; i < m; i++) {
let row = []; // Reinitialize row here

    for (let j = 0; j < n; j++) {
      row.push(0); // Push zeroes
    }

    newArray.push(row);

}

return newArray;
}

let matrix = zeroArray(3, 2);
console.log(matrix);
