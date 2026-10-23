const test = require("node:test");
const assert = require("node:assert/strict");

const {
    sortEvents
} = require("../../src/services/eventSorting");

const events = [
    {
        name: "Python Workshop",
        date: "2026-11-15",
        price: 5000,
        available: 10
    },
    {
        name: "JavaScript Bootcamp",
        date: "2026-11-10",
        price: 3000,
        available: 5
    },
    {
        name: "Django Training",
        date: "2026-11-20",
        price: 7000,
        available: 20
    }
];

test("sortEvents sorts by date ascending", () => {
    const result = sortEvents(events, "date");

    assert.deepEqual(
        result.map(event => event.name),
        [
            "JavaScript Bootcamp",
            "Python Workshop",
            "Django Training"
        ]
    );
});

test("sortEvents sorts by price ascending", () => {
    const result = sortEvents(events, "price");

    assert.deepEqual(
        result.map(event => event.price),
        [3000, 5000, 7000]
    );
});

test("sortEvents sorts by availability descending", () => {
    const result = sortEvents(events, "availability");

    assert.deepEqual(
        result.map(event => event.available),
        [20, 10, 5]
    );
});

test("sortEvents rejects an unsupported sorting option", () => {
    assert.throws(
        () => sortEvents(events, "location"),
        /Unsupported sort option/
    );
});