const test = require("node:test");
const assert = require("node:assert/strict");
const { searchEvents } = require("../../src/services/eventSearch");

const events = [
    {
        name: "Python Workshop",
        description: "Learn backend development",
        city: "Sokoto",
        date: "2026-11-10",
        price: 3000
    },
    {
        name: "JavaScript Bootcamp",
        description: "Learn JavaScript",
        city: "Abuja",
        date: "2026-11-15",
        price: 5000
    },
    {
        name: "Django Training",
        description: "Learn backend development",
        city: "Sokoto",
        date: "2026-11-20",
        price: 7000
    }
];

test("searchEvents finds events by text", () => {
    const result = searchEvents(events, { text: "python" });

    assert.equal(result.length, 1);
    assert.equal(result[0].name, "Python Workshop");
});

test("searchEvents filters by city", () => {
    const result = searchEvents(events, { city: "Sokoto" });

    assert.equal(result.length, 2);
});

test("searchEvents filters by date range", () => {
    const result = searchEvents(events, {
        startDate: "2026-11-11",
        endDate: "2026-11-19"
    });

    assert.equal(result.length, 1);
    assert.equal(result[0].name, "JavaScript Bootcamp");
});

test("searchEvents filters by minimum and maximum price", () => {
    const result = searchEvents(events, {
        minPrice: 3000,
        maxPrice: 5000
    });

    assert.equal(result.length, 2);
});