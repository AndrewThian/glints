import readline from 'readline';

const config = {
  input: process.stdin,
  output: process.stdout,
  terminal: false,
};

const prefix = '>> ';
const prompt = readline.createInterface(config);
prompt.setPrompt(prefix);
prompt.prompt();

prompt.on('line', (value) => {
  const result = factorial(value);
  console.log(result);
});

// #################### ignore above this line #################### //

// TIME START: 21:12pm 01/12/18
// TIME END: 11:15pm 01/12/18
// DURATION: 1hr 58minutes

/**
 * the function below does not account for numbers larger than 9007199254740991 | Number.MAX_SAFE_INTEGER
 */
// export const factorial = num => {
//     if (num === 0 || num === 1) {
//         return num
//     }
//     return result * num
// }

/**
 * we'll be using the incremental factorial algorithm instead of recursion
 * then we reduce the multiply function into addition instead of using the product operator
 * because we want to use strings instead of numbers to add two "overflowed" javasript numbers
 * @param {number} num
 */
export const factorial = (num) => {
  if (num === 0 || num === 1) {
    return num.toString();
  }
  let factor = 1;
  // starting from 2 as 0 and 1 are redundant
  for (let i = 2; i <= num; i++) {
    if (Number.isSafeInteger(factor * i)) {
      factor *= i;
    } else {
      factor = multiply(factor.toString(), i.toString());
    }
  }
  if (typeof factor === 'number') {
    factor = factor.toString();
  }
  return factor;
};


/**
 * Example, instead of using 3 * 4,
 * we are doing 3 + 3 + 3 + 3 so we can implement our own addition function
 * @param {string} num1 is our initial product
 * @param {string} toNum is the number we want to multiply to
 */
export function multiply(num1, toNum) {
  if (typeof num1 !== 'string' || typeof toNum !== 'string') {
    return '';
  }
  // we set our product here to string as we are passing it into our every own addition function
  let product = '0';
  for (let i = 0; i < toNum; i++) {
    product = addLargeNumber(product, num1);
  }
  return product;
}

/**
 * Basic princple, we are using the carry over addition method.
 * Example, 14 + 18 = 32 because we add the ones first then carry over to add the tens
 * @param {string} strNum1 string number to add
 * @param {string} strNum2 string number to add
 */
export function addLargeNumber(strNum1, strNum2) {
  // if length of 2 is larger than 1, we want to swap
  if (strNum2.length > strNum1.length) {
    const temp = strNum1;
    strNum1 = strNum2;
    strNum2 = temp;
  }
  // after swapping
  const len1 = strNum1.length;
  const len2 = strNum2.length;
  // we will be using arrays to represent the numbers to add
  let arr1 = strNum1.split('');
  let arr2 = strNum2.split('');
  // get the difference in their lengths and add 0 to represent the missing digits
  for (let i = 0; i < (len1 - len2); i++) {
    arr2.unshift('0');
  }
  // turn all string number to integers for addition
  arr1 = arr1.map(e => parseInt(e, 10));
  arr2 = arr2.map(e => parseInt(e, 10));

  let a;
  let b;
  let carry = 0;
  const result = [];
  // iterate through the numbers from the back
  for (let i = len1 - 1; i >= 0; i--) {
    a = arr1[i];
    b = arr2[i];

    const sum = a + b + carry;
    const [tens, ones] = splitNumber(sum);
    // add tens to carry over
    carry = tens;
    // insert from the front
    result.unshift(ones);
  }
  // if we have left over carry, add to the results
  if (carry > 0) {
    result.unshift(carry);
  }
  return result.join('');
}

/**
 * split numbers into tens and ones
 * this might not be the most optimal way of splitting 10s and 1s but it will do for now
 * @param {number} n
 */
export function splitNumber(n) {
  if (n > 99) {
    return [0, 0];
  }
  if (n < 10) {
    return [0, n];
  }
  return n.toString().split('').map(e => parseInt(e, 10));
}
