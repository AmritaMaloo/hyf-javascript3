//Step 1: write a program that doubles the odd numbers in an array and throws away the even number.
const array = [1, 2, 3, 4, 5, 6];
console.log((array.filter(element => element % 2 !== 0)).map(element => element * 2));

