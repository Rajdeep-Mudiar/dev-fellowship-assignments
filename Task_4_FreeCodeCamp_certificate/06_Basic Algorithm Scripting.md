# New Learnings from this course

## 1. Reverse a String

Task
Reverse the provided string and return the reversed string.
For example, "hello" should become "olleh".

Code
function reverseString(str) {
let reversed = "";

for (let i = str.length - 1; i >= 0; i--) {
reversed += str[i];
}

return reversed;
}

reverseString("hello");

## 2. Find the Longest Word in a String

Task
Return the length of the longest word in the provided sentence.Your response should be a number.

Solution
function findLongestWordLength(str) {
let words=str.split(" ");
let maxlen=0;
for(let i=0;i<words.length;i++){
if(words[i].length>maxlen){
maxlen=words[i].length;
}
}
return maxlen;
}

findLongestWordLength('The quick brown fox jumped over the lazy dog');

## 3. Return Largest Numbers in Arrays

Task
Return an array consisting of the largest number from each provided sub-array. For simplicity, the provided array will contain exactly 4 sub-arrays. Remember, you can iterate through an array with a simple for loop, and access each member with array syntax arr[i].

Solution
function largestOfFour(arr) {
let newArr=[];
for(let i=0;i<arr.length;i++){
newArr.push(Math.max(...arr[i]));

}
return newArr;
}

largestOfFour([
[4, 5, 1, 3],
[13, 27, 18, 26],
[32, 35, 37, 39],
[1000, 1001, 857, 1]
]);

## 4. Confirm the Ending

Task
Check if a string (first argument, str) ends with the given target string (second argument, target).

This challenge can be solved with the .endsWith() method, which was introduced in ES2015. But for the purpose of this challenge, we would like you to use one of the JavaScript substring methods instead.

Solution 1(Using endswith())
function confirmEnding(str, target) {
return str.endsWith(target);
}

confirmEnding('Bastian', 'n');

Solution 2(Without using endswith())
function confirmEnding(str, target) {
return str.slice(-target.length) === target;
}

confirmEnding('Bastian', 'n');

## 5. Repeat a String Repeat a String

Task
Repeat a given string str (first argument) for num times (second argument). Return an empty string if num is not a positive number. For the purpose of this challenge, do not use the built-in .repeat() method.

Solution
function repeatStringNumTimes(str, num) {
let n="";
if(num<0){
return n;
}
else{
for(let i=0;i<num;i++){
n+=str;
}
return n;
}
}

repeatStringNumTimes('abc', 3);

## 6. Truncate a String

Task
Truncate a string (first argument) if it is longer than the given maximum string length (second argument). Return the truncated string with a ... ending.

Solution
function truncateString(str, num) {
if (str.length > num) {
return str.slice(0, num) + "...";
}
return str;
}

truncateString("A-tisket a-tasket A green and yellow basket", 8);

## 7. Finders Keepers

Task
Create a function that looks through an array arr and returns the first element in it that passes a 'truth test'. This means that given an element x, the 'truth test' is passed if func(x) is true. If no element passes the test, return undefined.

Solution
function findElement(arr, func) {
for(let i=0;i<arr.length;i++){
if(func(arr[i])){
return arr[i];
}
}
return undefined;
}

findElement([1, 2, 3, 4], num => num % 2 === 0);

## 8. Boo who

Task
Check if a value is classified as a boolean primitive. Return true or false.
Boolean primitives are true and false.

Solution
function booWho(bool) {
if(bool===true ||bool===false){
return true;
}
return false;
}

booWho(null);

## 9. Title Case a Sentence

Task
Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.
For the purpose of this exercise, you should also capitalize connecting words like the and of.

Tests:
Waiting:1. titleCase("I'm a little tea pot") should return a string.
Waiting:2. titleCase("I'm a little tea pot") should return the string I'm A Little Tea Pot.
Waiting:3. titleCase("sHoRt AnD sToUt") should return the string Short And Stout.
Waiting:4. titleCase("HERE IS MY HANDLE HERE IS MY SPOUT") should return the string Here Is My Handle Here Is My Spout.

Solution
function titleCase(str) {
let a=str.toLowerCase().split(" ");
for(let i=0;i<a.length;i++){
a[i]=a[i][0].toUpperCase()+a[i].slice(1);
}
return a.join(" ");
}

titleCase("I'm a little tea pot");

## 10. Slice and Splice

Task
You are given two arrays and an index.Copy each element of the first array into the second array, in order.Begin inserting elements at index n of the second array. Return the resulting array. The input arrays should remain the same after the function runs.

Solution
function frankenSplice(arr1, arr2, n) {
let newArr=arr2.slice();
newArr.splice(n,0,...arr1);
return newArr;
}

frankenSplice([1, 2, 3], [4, 5, 6], 1);

## 11. Falsy Bouncer

Task
Remove all falsy values from an array. Return a new array; do not mutate the original array. Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.

Hint: Try converting each value to a Boolean.

Solution
function bouncer(arr) {
let newArr = [];

for (let i = 0; i < arr.length; i++) {
if (Boolean(arr[i])) {
newArr.push(arr[i]);
}
}

return newArr;
}

bouncer([7, "ate", "", false, 9]);

## 12. Where do I Belong

Task
Return the lowest index at which a value (second argument) should be inserted into an array (first argument) once it has been sorted. The returned value should be a number.

For example, getIndexToIns([1,2,3,4], 1.5) should return 1 because it is greater than 1 (index 0), but less than 2 (index 1).

Likewise, getIndexToIns([20,3,5], 19) should return 2 because once the array has been sorted it will look like [3,5,20] and 19 is less than 20 (index 2) and greater than 5 (index 1).

Solution

function getIndexToIns(arr, num) {
arr.sort((a, b) => a - b);

for (let i = 0; i < arr.length; i++) {
if (num <= arr[i]) {
return i;
}
}

return arr.length;
}

getIndexToIns([40, 60], 50);

## 13. Mutations

Task
Return true if the string in the first element of the array contains all of the letters of the string in the second element of the array.

For example, ["hello", "Hello"], should return true because all of the letters in the second string are present in the first, ignoring case.

The arguments ["hello", "hey"] should return false because the string hello does not contain a y.

Lastly, ["Alien", "line"], should return true because all of the letters in line are present in Alien.

Solution
function mutation(arr) {
let first = arr[0].toLowerCase();
let second = arr[1].toLowerCase();

for (let i = 0; i < second.length; i++) {
if (!first.includes(second[i])) {
return false;
}
}

return true;
}

mutation(["hello", "hey"]);

## 14. Chunky Monkey

Task
Write a function that splits an array (first argument) into groups the length of size (second argument) and returns them as a two-dimensional array.

Solution
function chunkArrayInGroups(arr, size) {
let newArr=[];
for(let i=0;i<arr.length;i+=size){
newArr.push(arr.slice(i,i+size))
}
return newArr;
}

chunkArrayInGroups(['a', 'b', 'c', 'd'], 2);
