// 1. we want to traverse the grid ring by ring, to unwrap all the rings into arrays
// 2. rotate each of those arrays by shifting and pushing
// 3. fill a grid back up with the unwrapped rings

/**
 * @param {*} width max width of the grid
 * @param {*} height max height of the grid
 * @param {*} grid grid[][]
 */
export function traverseSpiral(width, height, grid) {
    if (Math.min(width, height) % 2 !== 0) {
        return new Map();
    }

    let rowStart = 0
    let colStart = 0

    // normalize from numerical to index numerical
    // last row should be the maximum height of the grid
    let rowEnd = height - 1
    // last col should be the maximum width of the grid
    let colEnd = width - 1

    const store = new Map()
    let currentRing = []
    let ringCounter = 1
    // while not done with the spiral
    while(rowStart < rowEnd && colStart < colEnd) {
        // first row move right
        // grid[x][y++]
        for (let i = colStart; i <= colEnd; i++) {
            // console.log("top row: ", grid[rowStart][i])
            currentRing.push(grid[rowStart][i])
        }
        // start traversing from one row down to avoid repeats
        rowStart++

        // last column move down
        // grid[x--][y]
        for (let i = rowStart; i <= rowEnd; i++) {
            // console.log("right col: ", grid[i][colEnd])
            currentRing.push(grid[i][colEnd])
        }
        // start traversing from one col left to avoid repeats
        colEnd--

        // last row move right
        // grid[x][y--]
        for (let i = colEnd; i >= colStart; i--) {
            // console.log("bottom row: ", grid[rowEnd][i])
            currentRing.push(grid[rowEnd][i])
        }
        // start traversal from one row up to avoid repeats
        rowEnd--

        // first column move up
        // grid[x--][y]
        for (let i = rowEnd; i >= rowStart; i--) {
            // console.log("left col: ", grid[i][colStart])
            currentRing.push(grid[i][colStart])
        }
        // start next ring traverse from one col right
        colStart++
        
        // store current ring into store
        store.set(ringCounter, currentRing)
        // clear current ring
        currentRing = []
        // increment ring counter
        ringCounter++
    }
    return store
}

export function rotate(arr, times) {
    for (let i = 0; i < times; i++) {
        const ele = arr.shift()
        arr.push(ele)
    }
}

export function createGrid(rows, cols) {
    const col = cols;
    const row = rows;
    let grid = [];
    let counter = 1;
    for (let i = 0; i < col; i++) {
        let column = [];
        grid[i] = column;
        for (let j = 0; j < row; j++) {
            column.push(counter);
            counter++;
        }
    }
    return grid;
}