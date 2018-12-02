
/**
 * The premise here is breaking down each state of what we are going to do
 * first we check if the array should be swapped, if not check if it can be reversed
 * @param {Array} arr incoming test array
 */
export const sorting = arr => {
    let [state, values] = compareSwap(arr)
    if (state === "swap") {
        // convert index numericals to running numbers
        const [index1, index2] = values
        console.log(`yes\nswap ${index1 + 1} ${index2 + 1}`)
        return
    } else if (state === "sorted") {
        console.log("yes")
        return
    } else if (state === "unknown") {
        console.log("no")
        return
    } else if (state === "reverse") {
        // perform reverse check
        let [shouldReverse, index1, index2] = compareReverse(arr, values)
        if (shouldReverse) {
            console.log(`yes reverse ${index1 + 1} ${index2 + 1}`)
            return
        } else {
            console.log("no")
            return
        }
    }
}

/**
 * We compare the incoming input array with an already sorted control array,
 * generate a string to maintain what our current state of the function is,
 * while returning the values of the outcome.
 * in the interest of time, I'm going to use the built in sort method
 * @param {Array} test incoming input array
 */
export function compareSwap(test) {
    // key = element of array
    // value = index of array
    // we need to duplicate the array to previous mutations
    let controlSorted = test.concat().sort((a, b) => a - b)
    let hash = new Map();
    for (let i = 0; i < test.length; i++) {
        if (test[i] !== controlSorted[i]) {
            hash.set(test[i], i)
        }
    }
    const keys = Array.from(hash.keys())
    const values = Array.from(hash.values())
    if (keys.length === 2) {
        // if only 2 values, I can assume that we just need to swap
        return ["swap", values]
    } else if (keys.length === 0) {
        // if no values, it's already sorted
        return ["sorted", values]
    } else if (keys.length > 2) {
        // if there's greater than 2, it might need to be reverse
        // proceed to reverse comparison
        return ["reverse", values]
    } else {
        // if it's 1, means that I can't swap or reverse
        // proceed to output no
        return ["unknown", values]
    }
}

/**
 * we want to take the max and min of the indexs, 
 * loop through that sub array and compare with our control reverse
 * @param {*} test incoming array
 * @param {*} values indexs of elements that have failed the comparison
 */
export function compareReverse(test, values) {
    let control = test.concat().sort((a, b) => a - b);
    let min = Math.min(...values)
    let max = Math.max(...values)
    let testSlice = test.slice(min, max + 1)
    let controlSlice = control.slice(min, max + 1)
    
    testSlice.reverse()

    let results = []
    for (let i = 0; i < testSlice.length; i++) {
        if (testSlice[i] !== controlSlice[i]) {
            results.push(testSlice[i])
        }
    }

    if (results.length > 0) {
        return [false, 0, 0]
    }

    return [true, min, max]
}