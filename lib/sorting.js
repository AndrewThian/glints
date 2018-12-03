

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.sorting = undefined;

const _slicedToArray = (function () { function sliceIterator(arr, i) { const _arr = []; let _n = true; let _d = false; let _e; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i.return) _i.return(); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } throw new TypeError('Invalid attempt to destructure non-iterable instance'); }; }());

exports.compareSwap = compareSwap;
exports.compareReverse = compareReverse;

const _readline = require('readline');

const _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } return Array.from(arr); }

const config = {
  input: process.stdin,
  output: process.stdout,
  terminal: false,
};

const prefix = '>> ';
const prompt = _readline2.default.createInterface(config);
prompt.setPrompt(prefix);
prompt.prompt();

const input = [];
let length = void 0;
let array = void 0;

prompt.on('line', (cmd) => {
  if (cmd.length > 0) {
    input.push(cmd.split(' ').map(e => parseInt(e, 10)));
    if (input.length === 2) {
      length = input[0][0];
      array = input[1];

      sorting(array);
    }
  }
});

// #################### ignore above this line #################### //

// TIME START: 10:00am 02/12/18
// TIME END: 11:40am 02/12/18
// DURATION: 1hr 40minutes

/**
 * The premise here is breaking down each state of what we are going to do
 * first we check if the array should be swapped, if not check if it can be reversed
 * @param {Array} arr incoming test array
 */
var sorting = exports.sorting = function sorting(arr) {
  const _compareSwap = compareSwap(arr);


  const _compareSwap2 = _slicedToArray(_compareSwap, 2);


  const state = _compareSwap2[0];


  const values = _compareSwap2[1];

  if (state === 'swap') {
    // convert index numericals to running numbers
    const _values = _slicedToArray(values, 2);


    const index1 = _values[0];


    const index2 = _values[1];

    console.log(`yes\nswap ${index1 + 1} ${index2 + 1}`);
  } else if (state === 'sorted') {
    console.log('yes');
  } else if (state === 'unknown') {
    console.log('no');
  } else if (state === 'reverse') {
    // perform reverse check
    const _compareReverse = compareReverse(arr, values);


    const _compareReverse2 = _slicedToArray(_compareReverse, 3);


    const shouldReverse = _compareReverse2[0];


    const _index = _compareReverse2[1];


    const _index2 = _compareReverse2[2];

    if (shouldReverse) {
      console.log(`yes reverse ${_index + 1} ${_index2 + 1}`);
      return;
    }
    console.log('no');
  }
};

/**
 * We compare the incoming input array with an already sorted control array,
 * generate a string to maintain what our current state of the function is,
 * while returning the values of the outcome.
 * in the interest of time, I'm going to use the built in sort method
 * @param {Array} test incoming input array
 */
function compareSwap(test) {
  // key = element of array
  // value = index of array
  // we need to duplicate the array to previous mutations
  const controlSorted = test.concat().sort((a, b) => a - b);
  const hash = new Map();
  for (let i = 0; i < test.length; i++) {
    if (test[i] !== controlSorted[i]) {
      hash.set(test[i], i);
    }
  }
  const keys = Array.from(hash.keys());
  const values = Array.from(hash.values());
  if (keys.length === 2) {
    // if only 2 values, I can assume that we just need to swap
    return ['swap', values];
  } if (keys.length === 0) {
    // if no values, it's already sorted
    return ['sorted', values];
  } if (keys.length > 2) {
    // if there's greater than 2, it might need to be reverse
    // proceed to reverse comparison
    return ['reverse', values];
  }
  // if it's 1, means that I can't swap or reverse
  // proceed to output no
  return ['unknown', values];
}

/**
 * we want to take the max and min of the indexs,
 * loop through that sub array and compare with our control reverse
 * @param {*} test incoming array
 * @param {*} values indexs of elements that have failed the comparison
 */
function compareReverse(test, values) {
  const control = test.concat().sort((a, b) => a - b);
  const min = Math.min(..._toConsumableArray(values));
  const max = Math.max(..._toConsumableArray(values));
  const testSlice = test.slice(min, max + 1);
  const controlSlice = control.slice(min, max + 1);

  testSlice.reverse();

  const results = [];
  for (let i = 0; i < testSlice.length; i++) {
    if (testSlice[i] !== controlSlice[i]) {
      results.push(testSlice[i]);
    }
  }

  if (results.length > 0) {
    return [false, 0, 0];
  }

  return [true, min, max];
}
