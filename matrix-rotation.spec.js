import { traverseSpiral, rotate, createGrid } from "./matrix-rotation"

describe("#traverseSpiral", () => {
    it("4x4: should return a map of 2 rings", () => {
        const grid = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ]
        const map = new Map()
        map.set(1, [1,2,3,4,8,12,16,15,14,13,9,5])
        map.set(2, [6,7,11,10])
    
        expect(traverseSpiral(4, 4, grid)).toEqual(map)
    })
    it("2x4: should return a map of 1 ring", () => {
        const grid = [
            [1,2],
            [3,4],
            [5,6],
            [7,8]
        ]
        const map = new Map()
        map.set(1, [1,2,4,6,8,7,5,3])
    
        expect(traverseSpiral(2, 4, grid)).toEqual(map)
    })
})

describe("#rotate", () => {
    it("should rotate an array 2 times", () => {
        const testArr = [1,2,3,4]
        rotate(testArr, 2)
        expect(testArr).toEqual([3, 4, 1, 2])
    })
    it("should rotate an array 3 times", () => {
        const testArr = [1,2,3,4,5,6]
        rotate(testArr, 3)
        expect(testArr).toEqual([4,5,6,1,2,3])
    })
})

describe("#createGrid", () => {
    it("should create 2x4 grid", () => {
        const grid = [
            [1,2],
            [3,4],
            [5,6],
            [7,8]
        ]
        expect(createGrid(2, 4)).toEqual(grid)
    })
    it("should create 4x4 grid", () => {
        const grid = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ]
        expect(createGrid(4, 4)).toEqual(grid)
    })
})