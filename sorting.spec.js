import { sorting, compareSwap, compareReverse } from "./sorting"

describe("Sorting", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("should output yes if already sorted", () => {
        console.log = jest.fn(output => {
            expect(output).toEqual("yes")
        })

        sorting([1,2,3,4])
    })
    it("should output yes and return 1 4 to swap", () => {
        console.log = jest.fn(output => {
            expect(output).toEqual(`yes\nswap 1 4`)
        })

        sorting([4, 2, 3, 1])
    })
    it("should output yes and return 1 2 to swap", () => {
        console.log = jest.fn(output => {
            expect(output).toEqual(`yes\nswap 1 2`)
        })

        sorting([4, 2])
    })
    it("should output no if unable to swap", () => {
        console.log = jest.fn(output => {
            expect(output).toEqual("no")
        })

        sorting([3, 3, 1, 2])
    })
    it("should output yes reverse and index1, index2 to reverse", () => {
        console.log = jest.fn(output => {
            expect(output).toEqual("yes reverse 2 5")
        })

        sorting([1, 5, 4, 3, 2, 6])
    })
})

describe("compareSwap", () => {
    it("should return swap if need to swap", () => {
        let [state, hash] = compareSwap([4, 2, 3, 1])
        expect(state).toEqual("swap")
        expect(hash).toEqual([0, 3])
    })
    it("should return sorted if already sorted", () => {
        let [state, hash] = compareSwap([1,2,3,4])
        expect(state).toEqual("sorted")
        expect(hash).toEqual([])
    })
})

describe("compareReverse", () => {
    it("should return true and index1, index2 to reverse", () => {
        let [shouldReverse, index1, index2] = compareReverse([1, 5, 4, 3, 2], [1, 2, 3, 4])
        expect(shouldReverse).toEqual(true)
        expect(index1).toEqual(1)
        expect(index2).toEqual(4)
    })
    it("should return false and 0, 0 if unable to reverse", () => {
        let [shouldReverse, index1, index2] = compareReverse([1, 5, 6, 3, 2], [1, 2, 3, 4])
        expect(shouldReverse).toEqual(false)
        expect(index1).toEqual(0)
        expect(index2).toEqual(0)
    })
})