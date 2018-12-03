"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factorial = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.multiply = multiply;
exports.addLargeNumber = addLargeNumber;
exports.splitNumber = splitNumber;

var _readline = require("readline");

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  input: process.stdin,
  output: process.stdout,
  terminal: false
};

var prefix = ">> ";
var prompt = _readline2.default.createInterface(config);
prompt.setPrompt(prefix);
prompt.prompt();

prompt.on("line", function (value) {
  var result = factorial(value);
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
var factorial = exports.factorial = function factorial(num) {
  if (num === 0 || num === 1) {
    return num.toString();
  }
  var factor = 1;
  // starting from 2 as 0 and 1 are redundant
  for (var i = 2; i <= num; i++) {
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
function multiply(num1, toNum) {
  if (typeof num1 !== 'string' || typeof toNum !== 'string') {
    return '';
  }
  // we set our product here to string as we are passing it into our every own addition function
  var product = '0';
  for (var i = 0; i < toNum; i++) {
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
function addLargeNumber(strNum1, strNum2) {
  // if length of 2 is larger than 1, we want to swap
  if (strNum2.length > strNum1.length) {
    var temp = strNum1;
    strNum1 = strNum2;
    strNum2 = temp;
  }
  // after swapping
  var len1 = strNum1.length;
  var len2 = strNum2.length;
  // we will be using arrays to represent the numbers to add
  var arr1 = strNum1.split('');
  var arr2 = strNum2.split('');
  // get the difference in their lengths and add 0 to represent the missing digits
  for (var i = 0; i < len1 - len2; i++) {
    arr2.unshift('0');
  }
  // turn all string number to integers for addition
  arr1 = arr1.map(function (e) {
    return parseInt(e, 10);
  });
  arr2 = arr2.map(function (e) {
    return parseInt(e, 10);
  });

  var a = void 0;
  var b = void 0;
  var carry = 0;
  var result = [];
  // iterate through the numbers from the back
  for (var _i = len1 - 1; _i >= 0; _i--) {
    a = arr1[_i];
    b = arr2[_i];

    var sum = a + b + carry;

    var _splitNumber = splitNumber(sum),
        _splitNumber2 = _slicedToArray(_splitNumber, 2),
        tens = _splitNumber2[0],
        ones = _splitNumber2[1];
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
function splitNumber(n) {
  if (n > 99) {
    return [0, 0];
  }
  if (n < 10) {
    return [0, n];
  }
  return n.toString().split('').map(function (e) {
    return parseInt(e, 10);
  });
}