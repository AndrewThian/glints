import { factorial, multiply, addLargeNumber, splitNumber } from "./factorial"

describe("Factorial", () => {
    it("should return 1 if === 1", () => {
        expect(factorial(1)).toEqual("1")
    })
    it("should return 0 if === 1", () => {
        expect(factorial(0)).toEqual("0")
    })
    it("should return 6", () => {
        expect(factorial(3)).toEqual("6")
    })
    it("should return 15511210043330985984000000", () => {
        // this exceeds javascript's largest exact integer
        expect(factorial(25)).toEqual("15511210043330985984000000")
    })
})

describe("multiply", () => {
    it("should return empty string if not provided with strings", () => {
        expect(multiply(2, 5)).toEqual("");
    })
    it("should return 10", () => {
        expect(multiply("2", "5")).toEqual("10")
    })
})

describe("addLargeNumber", () => {
    it("should return 1000", () => {
        expect(addLargeNumber("500", "500")).toEqual("1000")
    })
    it("should return 123133", () => {
        expect(addLargeNumber("120000", "3133")).toEqual("123133")
    })
})

describe("splitNumber", () => {
    it("should return [0, 0] if larger than tens and ones", () => {
        expect(splitNumber(100)).toEqual([0, 0])
    })
    it("should return [0, n] if < 10", () => {
        expect(splitNumber(7)).toEqual([0, 7])
    })
    it("should return tens and ones", () => {
        expect(splitNumber(32)).toEqual([3, 2])
    })
})