"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traverseSpiral = traverseSpiral;
exports.fillGrid = fillGrid;
exports.rotate = rotate;
exports.createGrid = createGrid;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// TIME START: 8:00pm 02/12/18
// TIME END: 10:17pm 02/12/18
// DURATION: 2hr 17minutes

// 1. we want to traverse the grid ring by ring, to unwrap all the rings into arrays
// 2. rotate each of those arrays by shifting and pushing
// 3. fill a grid back up with the unwrapped rings

var matrixRotation = exports.matrixRotation = function matrixRotation(rows, cols, rotations, grid) {
  var store = traverseSpiral(rows, cols, grid);
  var rings = store.values();
  // rotate each ring
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = rings[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var ring = _step.value;

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

  var rotated = fillGrid(rows, cols, store);
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

  var rowStart = 0;
  var colStart = 0;

  // last row should be the maximum height of the grid
  var rowEnd = rows - 1;
  // last col should be the maximum width of the grid
  var colEnd = cols - 1;

  var store = new Map();
  var currentRing = [];
  var ringCounter = 1;
  // while not done with the spiral
  while (rowStart < rowEnd && colStart < colEnd) {
    // first row move right
    // grid[x][y++]
    for (var i = colStart; i <= colEnd; i++) {
      // console.log("top row: ", grid[rowStart][i])
      currentRing.push(grid[rowStart][i]);
    }
    // start traversing from one row down to avoid repeats
    rowStart++;

    // last column move down
    // grid[x--][y]
    for (var _i = rowStart; _i <= rowEnd; _i++) {
      // console.log("right col: ", grid[i][colEnd])
      currentRing.push(grid[_i][colEnd]);
    }
    // start traversing from one col left to avoid repeats
    colEnd--;

    // last row move right
    // grid[x][y--]
    for (var _i2 = colEnd; _i2 >= colStart; _i2--) {
      // console.log("bottom row: ", grid[rowEnd][i])
      currentRing.push(grid[rowEnd][_i2]);
    }
    // start traversal from one row up to avoid repeats
    rowEnd--;

    // first column move up
    // grid[x--][y]
    for (var _i3 = rowEnd; _i3 >= rowStart; _i3--) {
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
  var grid = [];
  for (var i = 0; i < row; i++) {
    grid.push([]);
  }

  var rowStart = 0;
  var colStart = 0;

  var rowEnd = row - 1;
  var colEnd = col - 1;

  var ringCounter = 1;
  var ringIndex = 0;

  while (rowStart < rowEnd && colStart < colEnd) {
    // first row move right
    // grid[x][y++]
    for (var _i4 = colStart; _i4 <= colEnd; _i4++) {
      grid[rowStart][_i4] = store.get(ringCounter)[ringIndex];
      ringIndex++;
    }
    rowStart++;

    // last column move down
    // grid[x--][y]
    for (var _i5 = rowStart; _i5 <= rowEnd; _i5++) {
      grid[_i5][colEnd] = store.get(ringCounter)[ringIndex];
      ringIndex++;
    }
    colEnd--;

    // last row move right
    // grid[x][y--]
    for (var _i6 = colEnd; _i6 >= colStart; _i6--) {
      // console.log("bottom row: ", grid[rowEnd][i])
      grid[rowEnd][_i6] = store.get(ringCounter)[ringIndex];
      ringIndex++;
    }
    // start traversal from one row up to avoid repeats
    rowEnd--;

    // first column move up
    // grid[x--][y]
    for (var _i7 = rowEnd; _i7 >= rowStart; _i7--) {
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
  for (var i = 0; i < times; i++) {
    var ele = arr.shift();
    arr.push(ele);
  }
}

function createGrid(rows, cols) {
  var col = cols;
  var row = rows;
  var grid = [];
  var counter = 1;
  for (var i = 0; i < row; i++) {
    var column = [];
    grid[i] = column;
    for (var j = 0; j < col; j++) {
      column.push(counter);
      counter++;
    }
  }
  return grid;
}

function print(grid) {
  grid.map(function (row) {
    var _console;

    (_console = console).log.apply(_console, _toConsumableArray(row));
  });
}