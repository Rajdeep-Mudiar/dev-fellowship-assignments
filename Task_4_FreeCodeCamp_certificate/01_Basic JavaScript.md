# New Learnings from this course

## 1. .shift() --> removes the first element

const ourArray = ["Stimpson", "J", ["cat"]];
const removedFromOurArray = ourArray.shift();

## 2. unshift () --> adds the element at the beginning of the array

const ourArray = ["Stimpson", "J", "cat"];
ourArray.shift();
ourArray.unshift("Happy");

## 3. Global Scope and Functions

In JavaScript, scope refers to the visibility of variables. Variables which are defined outside of a function block have Global scope. This means, they can be seen everywhere in your JavaScript code.

Variables which are declared without the let or const keywords are automatically created in the global scope. This can create unintended consequences elsewhere in your code or when running a function again. You should always declare your variables with let or const.

## 4. Understanding Undefined Value returned from a Function

A function can include the return statement but it does not have to. In the case that the function doesn't have a return statement, when you call it, the function processes the inner code but the returned value is undefined.

Example

let sum = 0;

function addSum(num) {
sum = sum + num;
}

addSum(3);

addSum is a function without a return statement. The function will change the global sum variable but the returned value of the function is undefined.

## 5. typeof operator

In JavaScript, you can determine the type of a variable or a value with the typeof operator, as follows:

typeof 3
typeof '3'

typeof 3 returns the string number, and typeof '3' returns the string string.

## 6. Comparison with the Inequality Operator

The inequality operator (!=) is the opposite of the equality operator. Inequality means not equal. The inequality operator returns false when the equality operator would return true and vice versa. Like the equality operator, the inequality operator will convert data types of values while comparing.

Examples
1 != 2 // true
1 != "1" // false
1 != '1' // false
1 != true // false
0 != false // false

## 7. Comparison with the Strict Inequality Operator

The strict inequality operator (!==) is the logical opposite of the strict equality operator. It means "Strictly Not Equal" and returns false where strict equality would return true and vice versa. The strict inequality operator will not convert data types.

Examples

3 !== 3 // false
3 !== '3' // true
4 !== 3 // true

## 8. switch statement

A switch statement compares the value to the case statements which define various possible values. Any valid JavaScriptstatements can be executed inside a case block and will run from the first matched case value until a break is encountered.

Example

switch (fruit) {
case "apple":
console.log("The fruit is an apple");
break;
case "orange":
console.log("The fruit is an orange");
break;
}

In a switch statement you may not be able to specify all possible values as case statements. Instead, you can add the default statement which will be executed if no matching case statements are found. Think of it like the final else statement in an if/else chain.

A default statement should be the last case.

switch (num) {
case value1:
statement1;
break;
case value2:
statement2;
break;
...
default:
defaultStatement;
break;
}

## 9. Multiple Identical Options in Switch Statements

If the break statement is omitted from a switch statement's case, the following case statement(s) are executed until a break is encountered. If you have multiple inputs with the same output, you can represent them in a switch statement like this:

let result = "";
switch (val) {
case 1:
case 2:
case 3:
result = "1, 2, or 3";
break;
case 4:
result = "4 alone";
}
Cases for 1, 2, and 3 will all produce the same result.

Task
Write a switch statement to set answer for the following ranges:
1-3 - Low
4-6 - Mid
7-9 - High

Note: You will need to have a case statement for each number in the range.

Soln
function sequentialSizes(val) {
let answer = "";
// Only change code below this line
switch(val){
case 1:
case 2:
case 3:
answer="Low";
break;
case 4:
case 5:
case 6:
answer="Mid";
break;
case 7:
case 8:
case 9:
answer="High";
break;
}

// Only change code above this line
return answer;
}

sequentialSizes(1);

## 10. Return Early Pattern for Functions

When a return statement is reached, the execution of the current function stops and control returns to the calling location.

Example

function myFun() {
console.log("Hello");
return "World";
console.log("byebye")
}
myFun();
The above will display the string Hello in the console, and return the string World. The string byebye will never display in the console, because the function exits at the return statement.

## 11. Counting Cards

In the casino game Blackjack, a player can determine whether they have an advantage on the next hand over the house by keeping track of the relative number of high and low cards remaining in the deck. This is called Card Counting.

Having more high cards remaining in the deck favors the player. Each card is assigned a value according to the table below. When the count is positive, the player should bet high. When the count is zero or negative, the player should bet low.

Count Change Cards
+1 2, 3, 4, 5, 6
0 7, 8, 9
-1 10, 'J', 'Q', 'K', 'A'
You will write a card counting function. It will receive a card parameter, which can be a number or a string, and increment or decrement the global count variable according to the card's value (see table). The function will then return a string with the current count and the string Bet if the count is positive, or Hold if the count is zero or negative. The current count and the player's decision (Bet or Hold) should be separated by a single space.

Example Outputs: -3 Hold or 5 Bet

Hint
Do NOT reset count to 0 when value is 7, 8, or 9.
Do NOT return an array.
Do NOT include quotes (single or double) in the output.

Soution

let count = 0;

function cc(card) {
// Only change code below this line

switch(card) {
case 2:
case 3:
case 4:
case 5:
case 6:
count++;
break;

    case 10:
    case 'J':
    case 'Q':
    case 'K':
    case 'A':
      count--;
      break;

}

return count + (count > 0 ? " Bet" : " Hold");

// Only change code above this line
}

cc(2); cc(3); cc(7); cc('K'); cc('A');

## 12. Build JavaScript Objects

You may have heard the term object before.

Objects are similar to arrays, except that instead of using indexes to access and modify their data, you access the data in objects through what are called properties.

Objects are useful for storing data in a structured way, and can represent real world objects, like a cat.

Here's a sample cat object:

const cat = {
"name": "Whiskers",
"legs": 4,
"tails": 1,
"enemies": ["Water", "Dogs"]
};
In this example, all the properties are stored as strings, such as name, legs, and tails. However, you can also use numbers as properties. You can even omit the quotes for single-word string properties, as follows:

const anotherObject = {
make: "Ford",
5: "five",
"model": "focus"
};
However, if your object has any non-string properties, JavaScript will automatically typecast them as strings.

## 13. Accessing Object Properties with Dot Notation

There are two ways to access the properties of an object: dot notation (.) and bracket notation ([]), similar to an array.

Dot notation is what you use when you know the name of the property you're trying to access ahead of time.

Here is a sample of using dot notation (.) to read an object's property:

const myObj = {
prop1: "val1",
prop2: "val2"
};

const prop1val = myObj.prop1;
const prop2val = myObj.prop2;
prop1val would have a value of the string val1, and prop2val would have a value of the string val2.

## 14. Accessing Object Properties with Bracket Notation

The second way to access the properties of an object is bracket notation ([]). If the property of the object you are trying to access has a space in its name, you will need to use bracket notation.

However, you can still use bracket notation on object properties without spaces.

Here is a sample of using bracket notation to read an object's property:

const myObj = {
"Space Name": "Kirk",
"More Space": "Spock",
"NoSpace": "USS Enterprise"
};

myObj["Space Name"];
myObj['More Space'];
myObj["NoSpace"];
myObj["Space Name"] would be the string Kirk, myObj['More Space'] would be the string Spock, and myObj["NoSpace"] would be the string USS Enterprise.

## 15. Delete Properties from a JavaScript Object

We can also delete properties from objects like this:

delete ourDog.bark;
Example:

const ourDog = {
"name": "Camper",
"legs": 4,
"tails": 1,
"friends": ["everything!"],
"bark": "bow-wow"
};

delete ourDog.bark;
After the last line shown above, ourDog looks like:

{
"name": "Camper",
"legs": 4,
"tails": 1,
"friends": ["everything!"]
}

## 16. Testing Objects for Properties

To check if a property on a given object exists or not, you can use the .hasOwnProperty() method. someObject.hasOwnProperty(someProperty) returns true or false depending on if the property is found on the object or not.

Example

function checkForProperty(object, property) {
return object.hasOwnProperty(property);
}

checkForProperty({ top: 'hat', bottom: 'pants' }, 'top'); // true
checkForProperty({ top: 'hat', bottom: 'pants' }, 'middle'); // false
The first checkForProperty function call returns true, while the second returns false.

## 17 . Record Collection Problem

You are creating a function that aids in the maintenance of a musical album collection. The collection is organized as an object that contains multiple albums which are also objects. Each album is represented in the collection with a unique id as the property name. Within each album object, there are various properties describing information about the album. Not all albums have complete information.

The updateRecords function takes 4 arguments represented by the following function parameters:

records - an object containing several individual albums
id - a number representing a specific album in the records object
prop - a string representing the name of the album’s property to update
value - a string containing the information used to update the album’s property
Complete the function using the rules below to modify the object passed to the function.

Your function must always return the entire records object.
If value is an empty string, delete the given prop property from the album.
If prop isn't tracks and value isn't an empty string, assign the value to that album's prop.
If prop is tracks and value isn't an empty string, but the album doesn't have a tracks property, create an empty array and add value to it.
If prop is tracks and value isn't an empty string, add value to the end of the album's existing tracks array.
Note: A copy of the recordCollection object is used for the tests. You should not directly modify the recordCollection object.

Solution
// Setup
const recordCollection = {
2548: {
albumTitle: 'Slippery When Wet',
artist: 'Bon Jovi',
tracks: ['Let It Rock', 'You Give Love a Bad Name']
},
2468: {
albumTitle: '1999',
artist: 'Prince',
tracks: ['1999', 'Little Red Corvette']
},
1245: {
artist: 'Robert Palmer',
tracks: []
},
5439: {
albumTitle: 'ABBA Gold'
}
};

// Only change code below this line
function updateRecords(records, id, prop, value) {
if (value === "") {
delete records[id][prop];
} else if (prop !== "tracks") {
records[id][prop] = value;
} else {
if (!records[id].hasOwnProperty("tracks")) {
records[id].tracks = [];
}
records[id].tracks.push(value);
}

return records;
}

updateRecords(recordCollection, 5439, 'artist', 'ABBA');

## 18 . Iterate with JavaScript Do...While Loops

The next type of loop you will learn is called a do...while loop. It is called a do...while loop because it will first do one pass of the code inside the loop no matter what, and then continue to run the loop while the specified condition evaluates to true.

const ourArray = [];
let i = 0;

do {
ourArray.push(i);
i++;
} while (i < 5);

The example above behaves similar to other types of loops, and the resulting array will look like [0, 1, 2, 3, 4]. However, what makes the do...while different from other loops is how it behaves when the condition fails on the first check. Let's see this in action. Here is a regular while loop that will run the code in the loop as long as i < 5:

const ourArray = [];
let i = 5;

while (i < 5) {
ourArray.push(i);
i++;
}

In this example, we initialize the value of ourArray to an empty array and the value of i to 5. When we execute the while loop, the condition evaluates to false because i is not less than 5, so we do not execute the code inside the loop. The result is that ourArray will end up with no values added to it, and it will still look like [] when all of the code in the example above has completed running. Now, take a look at a do...while loop:

const ourArray = [];
let i = 5;

do {
ourArray.push(i);
i++;
} while (i < 5);

In this case, we initialize the value of i to 5, just like we did with the while loop. When we get to the next line, there is no condition to evaluate, so we go to the code inside the curly braces and execute it. We will add a single element to the array and then increment i before we get to the condition check. When we finally evaluate the condition i < 5 on the last line, we see that i is now 6, which fails the conditional check, so we exit the loop and are done. At the end of the above example, the value of ourArray is [5]. Essentially, a do...while loop ensures that the code inside the loop will run at least once. Let's try getting a do...while loop to work by pushing values to an array.

## 19. Generate Random Fractions with JavaScript

Random numbers are useful for creating random behavior.

JavaScript has a Math.random() function that generates a random decimal number between 0 (inclusive) and 1 (exclusive). Thus Math.random() can return a 0 but never return a 1.

Note: Like Storing Values with the Assignment Operator, all function calls will be resolved before the return executes, so we can return the value of the Math.random() function.

## 20. Generate Random Whole Numbers with JavaScript

You can generate random decimal numbers with Math.random(), but sometimes you need to generate random whole numbers. The following process will give you a random whole number less than 20:

Use Math.random() to generate a random decimal number.
Multiply that random decimal number by 20.
Use Math.floor() to round this number down to its nearest whole number.
Remember that Math.random() can never quite return a 1, so it's impossible to actually get 20 since you are rounding down with Math.floor(). This process will give you a random whole number in the range from 0 to 19.

Putting everything together, this is what your code looks like:

Math.floor(Math.random() \* 20);
You are calling Math.random(), multiplying the result by 20, then passing the value to Math.floor() to round the value down to the nearest whole number.

## 21. Generate Random Whole Numbers within a Range

You can generate a random whole number in the range from zero to a given number. You can also pick a different lower number for this range.

You'll call your minimum number min and your maximum number max.

This formula gives a random whole number in the range from min to max. Take a moment to read it and try to understand what this code is doing:

Math.floor(Math.random() \* (max - min + 1)) + min

## 22. Use the parseInt Function

The parseInt() function parses a string and returns an integer. Here's an example:

const a = parseInt("007");

The above function converts the string 007 to the integer 7. If the first character in the string can't be converted into a number, then it returns NaN.

## 23. Use the parseInt Function with a Radix

The parseInt() function parses a string and returns an integer. It takes a second argument for the radix, which specifies the base of the number in the string. The radix can be an integer between 2 and 36.

The function call looks like:

parseInt(string, radix);
And here's an example:

const a = parseInt("11", 2);
The radix variable says that 11 is in the binary system, or base 2. This example converts the string 11 to an integer 3.

## 24. Use the Conditional (Ternary) Operator

The conditional operator, also called the ternary operator, can be used as a one line if-else expression.

The syntax is a ? b : c, where a is the condition, b is the code to run when the condition returns true, and c is the code to run when the condition returns false.

The following function uses an if/else statement to check a condition:

function findGreater(a, b) {
if(a > b) {
return "a is greater";
}
else {
return "b is greater or equal";
}
}

This can be re-written using the conditional operator:

function findGreater(a, b) {
return a > b ? "a is greater" : "b is greater or equal";
}

## 25. Use Recursion to Create a Countdown

In a previous challenge, you learned how to use recursion to replace a for loop. Now, let's look at a more complex function that returns an array of consecutive integers starting with 1 through the number passed to the function.

As mentioned in the previous challenge, there will be a base case. The base case tells the recursive function when it no longer needs to call itself. It is a simple case where the return value is already known. There will also be a recursive call which executes the original function with different arguments. If the function is written correctly, eventually the base case will be reached.

For example, say you want to write a recursive function that returns an array containing the numbers 1 through n. This function will need to accept an argument, n, representing the final number. Then it will need to call itself with progressively smaller values of n until it reaches 1. You could write the function as follows:

function countup(n) {
if (n < 1) {
return [];
} else {
const countArray = countup(n - 1);
countArray.push(n);
return countArray;
}
}
console.log(countup(5));
The value [1, 2, 3, 4, 5] will be displayed in the console.

At first, this seems counterintuitive since the value of n decreases, but the values in the final array are increasing. This happens because the push happens last, after the recursive call has returned. At the point where n is pushed into the array, countup(n - 1) has already been evaluated and returned [1, 2, ..., n - 1].

Task

We have defined a function called countdown with one parameter (n). The function should use recursion to return an array containing the integers n through 1 based on the n parameter. If the function is called with a number less than 1, the function should return an empty array. For example, calling this function with n = 5 should return the array [5, 4, 3, 2, 1]. Your function must use recursion by calling itself and must not use loops of any kind.

Solution

function countdown(n) {
if (n < 1) {
return [];
} else {
const countArray = countdown(n - 1);
countArray.unshift(n);
return countArray;
}
}

## 26. Use Recursion to Create a Range of Numbers

Task
We have defined a function named rangeOfNumbers with two parameters. The function should return an array of integers which begins with a number represented by the startNum parameter and ends with a number represented by the endNum parameter. The starting number will always be less than or equal to the ending number. Your function must use recursion by calling itself and not use loops of any kind. It should also work for cases where both startNum and endNum are the same.

Solution
function rangeOfNumbers(startNum, endNum) {
if (startNum === endNum) {
return [startNum];
} else {
const numbers = rangeOfNumbers(startNum, endNum - 1);
numbers.push(endNum);
return numbers;
}
}
