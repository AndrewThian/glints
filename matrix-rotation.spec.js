import { traverseSpiral } from "./matrix-rotation"

describe("#traverseSpiral", () => {
    const grid = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ]

    traverseSpiral(4, 4, grid)
})