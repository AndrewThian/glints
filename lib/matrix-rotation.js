

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.matrixRotation = undefined;
exports.traverseSpiral = traverseSpiral;
exports.fillGrid = fillGrid;
exports.rotate = rotate;
exports.createGrid = createGrid;

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
let grid = void 0;
let rows = void 0;
let cols = void 0;
let rotations = void 0;

prompt.on('line', (cmd) => {
  if (cmd.length > 0) {
    input.push(cmd.split(' ').map(e => parseInt(e, 10)));
    if (input.length - 1 === parseInt(input[0][0], 10)) {
      rows = parseInt(input[0][0], 10);
      cols = parseInt(input[0][1], 10);
      rotations = parseInt(input[0][2], 10);

      grid = input.filter((e, i) => i !== 0);
      matrixRotation(rows, cols, rotations, grid);
    }
  }
});

// #################### ignore above this line #################### //

// TIME START: 8:00pm 02/12/18
// TIME END: 10:17pm 02/12/18
// DURATION: 2hr 17minutes

// 1. we want to traverse the grid ring by ring, to unwrap all the rings into arrays
// 2. rotate each of those arrays by shifting and pushing
// 3. fill a grid back up with the unwrapped rings

var matrixRotation = exports.matrixRotation = function matrixRotation(rows, cols, rotations, grid) {
  const store = traverseSpiral(rows, cols, grid);
  const rings = store.values();
  // rotate each ring
  let _iteratorNormalCompletion = true;
  let _didIteratorError = false;
  let _iteratorError;

  try {
    for (var _iterator = rings[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      const ring = _step.value;

      rotate(ring, rotations);
    }
    // fill grid with rings
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  const rotated = fillGrid(rows, cols, store);
  print(rotated);
  return rotated;
};

/**
 * @param {*} row max rows of the grid
 * @param {*} col max cols of the grid
 * @param {*} grid grid[][]
 */
function traverseSpiral(rows, cols, grid) {
  if (Math.min(rows, cols) % 2 !== 0) {
    return new Map();
  }

  let rowStart = 0;
  let colStart = 0;

  // last row should be the maximum height of the grid
  let rowEnd = rows - 1;
  // last col should be the maximum width of the grid
  let colEnd = cols - 1;

  const store = new Map();
  let currentRing = [];
  let ringCounter = 1;
  // while not done with the spiral
  while (rowStart < rowEnd && colStart < colEnd) {
    // first row move right
    // grid[x][y++]
    for (let i = colStart; i <= colEnd; i++) {
      // console.log("top row: ", grid[rowStart][i])
      currentRing.push(grid[rowStart][i]);
    }
    // start traversing from one row down to avoid repeats
    rowStart++;

    // last column move down
    // grid[x--][y]
    for (let _i = rowStart; _i <= rowEnd; _i++) {
      // console.log("right col: ", grid[i][colEnd])
      currentRing.push(grid[_i][colEnd]);
    }
    // start traversing from one col left to avoid repeats
    colEnd--;

    // last row move right
    // grid[x][y--]
    for (let _i2 = colEnd; _i2 >= colStart; _i2--) {
      // console.log("bottom row: ", grid[rowEnd][i])
      currentRing.push(grid[rowEnd][_i2]);
    }
    // start traversal from one row up to avoid repeats
    rowEnd--;

    // first column move up
    // grid[x--][y]
    for (let _i3 = rowEnd; _i3 >= rowStart; _i3--) {
      // console.log("left col: ", grid[i][colStart])
      currentRing.push(grid[_i3][colStart]);
    }
    // start next ring traverse from one col right
    colStart++;

    // store current ring into store
    store.set(ringCounter, currentRing);
    // clear current ring
    currentRing = [];
    // increment ring counter
    ringCounter++;
  }
  return store;
}

function fillGrid(row, col, store) {
  const grid = [];
  for (let i = 0; i < row; i++) {
    grid.push([]);
  }

  let rowStart = 0;
  let colStart = 0;

  let rowEnd = row - 1;
  let colEnd = col - 1;

  let ringCounter = 1;
  let ringIndex = 0;

  while (rowStart < rowEnd && colStart < colEnd) {
    // first row move right
    // grid[x][y++]
    for (let _i4 = colStart; _i4 <= colEnd; _i4++) {
      grid[rowStart][_i4] = store.get(ringCounter)[ringIndex];
      ringIndex++;
    }
    rowStart++;

    // last column move down
    // grid[x--][y]
    for (let _i5 = rowStart; _i5 <= rowEnd; _i5++) {
      grid[_i5][colEnd] = store.get(ringCounter)[ringIndex];
      ringIndex++;
    }
    colEnd--;

    // last row move right
    // grid[x][y--]
    for (let _i6 = colEnd; _i6 >= colStart; _i6--) {
      // console.log("bottom row: ", grid[rowEnd][i])
      grid[rowEnd][_i6] = store.get(ringCounter)[ringIndex];
      ringIndex++;
    }
    // start traversal from one row up to avoid repeats
    rowEnd--;

    // first column move up
    // grid[x--][y]
    for (let _i7 = rowEnd; _i7 >= rowStart; _i7--) {
      // console.log("left col: ", grid[i][colStart])
      grid[_i7][colStart] = store.get(ringCounter)[ringIndex];
      ringIndex++;
    }
    // start next ring traverse from one col right
    colStart++;

    // next ring in store
    ringCounter++;
    // reset ring index
    ringIndex = 0;
  }

  return grid;
}

function rotate(arr, times) {
  for (let i = 0; i < times; i++) {
    const ele = arr.shift();
    arr.push(ele);
  }
}

function createGrid(rows, cols, data) {
  console.log(rows, cols);
  const col = cols;
  const row = rows;
  const grid = [];
  let counter = 0;
  for (let i = 0; i < row; i++) {
    const column = [];
    grid[i] = column;
    for (let j = 0; j < col; j++) {
      console.log(data[counter]);
      column.push(data[counter]);
      counter++;
    }
  }
  return grid;
}

function print(grid) {
  grid.map((row) => {
    let _console;

    (_console = console).log.apply(_console, _toConsumableArray(row));
  });
}
