const test = require("node:test");
const assert = require("node:assert/strict");
const { mergeSort } = require("../../src/services/mergeSort");

test("mergeSort sorts numbers in ascending order", () => {
    const numbers = [8, 3, 6, 1, 5];

    const result = mergeSort(numbers, (a, b) => a - b);

    assert.deepEqual(result, [1, 3, 5, 6, 8]);
});

test("mergeSort handles an empty array", () => {
    assert.deepEqual(mergeSort([], (a, b) => a - b), []);
});

test("mergeSort handles a single item", () => {
    assert.deepEqual(mergeSort([7], (a, b) => a - b), [7]);
});