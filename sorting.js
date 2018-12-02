export const sorting = arr => {
    // in the interest of time, I'm going to use the built in sort method
    // as well as the reverse method
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
        return ["swap", values]
    } else if (keys.length === 0) {
        return ["sorted", values]
    } else if (keys.length > 2) {
        return ["reverse", values]
    } else {
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