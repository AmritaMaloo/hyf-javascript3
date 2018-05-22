//Step 1: Closure: We have an array with the numbers from 1 to 1000. Now we are interested in all numbers in that array which are divisible by 3. And then divisible by 10. And then by 21. We have implemented that using for loops:

const arr1_to_1000 = [];
for(i = 1; i <= 1000; i++) {
    arr1_to_1000.push(i);
}
console.log(arr1_to_1000);

function makeDivisibleFactory(x) {
    return function(arr1_to_1000) {
      return arr1_to_1000.filter(num => num % x == 0);
    };
  }
  
  const divisibleBy_3 = makeDivisibleFactory(3);
  const divisibleBy_10 = makeDivisibleFactory(10);
  const divisibleBy_21 = makeDivisibleFactory(21);
  
  console.log("Numbers divisible by 3", divisibleBy_3(arr1_to_1000));  
  console.log("Numbers divisible by 10", divisibleBy_10(arr1_to_1000)); 
  console.log("Numbers divisible by 21", divisibleBy_21(arr1_to_1000));

  //create an array which uses this factory above to calculate the number of item in arr above which are divisible by numbers between 1-30 i.e. your array will contain 30 items and looks something like this:
  //1000, 500, 333, 250, 200, 166, 142, 125, 111, 100, 90, 83, 76, 71, 66, 62, 58, 55, 52, 50, 47, 45, 43, 41, 40, 38, 37, 35, 34, 33]
  const arrayOf30nums = [];
  for(j = 1; j <=30; j++) {
      let divisibleBy_j = makeDivisibleFactory(j);
      arrayOf30nums.push(divisibleBy_j(arr1_to_1000).length);
  }
  console.log(arrayOf30nums);