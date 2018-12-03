## Info

~~It's 10:18pm Sunday. I've completed the first portion of the required assignment. The code runs directly with jest presets.~~

~~Reasons for doing so, I wanted to force myself to employ TDD practices instead of constantly logging to the commandline.~~

**Edit** it's now 11:35am Monday, I've added command line capabilities to the assignment.

> ~~The only way to run the code is via `Jest` specs.~~ We can echo and pipe input into the code, follow below for some examples on how to pass input into each of the assignments.

**Examples**:

> Factorial assignment: `echo "4" | node lib/factorial.js`

> Sorting assignment: `echo "2\n\n4 2" | node lib/sorting.js`

> Matrix-rotation assignment: `echo "4 4 1\n\n1 2 3 4\n\n5 6 7 8\n9 10 11 12\n13 14 15 16" | node lib/matrix-rotation.js`

---

## Scripts

My package.json scripts are as follows:

```
npm test - runs all the test cases
npm run build - transpiles es2015/es6 to es5
```