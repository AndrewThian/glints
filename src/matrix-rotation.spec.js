import {
  matrixRotation, traverseSpiral, rotate, createGrid, fillGrid,
} from './matrix-rotation';

describe('#matrixRotation', () => {
  it('should rotate 5x4 grid 7 times', () => {
    const grid = createGrid(5, 4);
    const test = [
      [20, 19, 18, 17],
      [16, 7, 11, 13],
      [12, 6, 15, 9],
      [8, 10, 14, 5],
      [4, 3, 2, 1],
    ];
    expect(matrixRotation(5, 4, 7, grid)).toEqual(test);
  });
  it('should rotate 2x2 grid 1 time', () => {
    const grid = createGrid(2, 2);
    const test = [
      [2, 4],
      [1, 3],
    ];
    expect(matrixRotation(2, 2, 1, grid)).toEqual(test);
  });
});
describe('#createGrid', () => {
  it('should create 2x4 grid', () => {
    const grid = [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ];
    expect(createGrid(4, 2)).toEqual(grid);
  });
  it('should create 5x4 grid', () => {
    const grid = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
      [17, 18, 19, 20],
    ];
    expect(createGrid(5, 4)).toEqual(grid);
  });
  it('should create 4x4 grid', () => {
    const grid = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(createGrid(4, 4)).toEqual(grid);
  });
});
describe('#traverseSpiral', () => {
  it('4x4: should return a map of 2 rings', () => {
    const grid = createGrid(4, 4);
    const map = new Map();
    map.set(1, [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5]);
    map.set(2, [6, 7, 11, 10]);

    expect(traverseSpiral(4, 4, grid)).toEqual(map);
  });
  it('4x2: should return a map of 1 ring', () => {
    const grid = createGrid(4, 2);
    const map = new Map();
    map.set(1, [1, 2, 4, 6, 8, 7, 5, 3]);

    expect(traverseSpiral(4, 2, grid)).toEqual(map);
  });
  it('5x4: should return a map of 1 ring', () => {
    const grid = createGrid(5, 4);
    const map = new Map();
    map.set(1, [1, 2, 3, 4, 8, 12, 16, 20, 19, 18, 17, 13, 9, 5]);
    map.set(2, [6, 7, 11, 15, 14, 10]);

    expect(traverseSpiral(5, 4, grid)).toEqual(map);
  });
});
describe('#rotate', () => {
  it('should rotate an array 2 times', () => {
    const testArr = [1, 2, 3, 4];
    rotate(testArr, 2);
    expect(testArr).toEqual([3, 4, 1, 2]);
  });
  it('should rotate an array 3 times', () => {
    const testArr = [1, 2, 3, 4, 5, 6];
    rotate(testArr, 3);
    expect(testArr).toEqual([4, 5, 6, 1, 2, 3]);
  });
});
describe('#fillGrid', () => {
  it('should fill grid', () => {
    const map = new Map();
    const grid = createGrid(5, 4);
    map.set(1, [1, 2, 3, 4, 8, 12, 16, 20, 19, 18, 17, 13, 9, 5]);
    map.set(2, [6, 7, 11, 15, 14, 10]);
    expect(fillGrid(5, 4, map)).toEqual(grid);
  });
});
