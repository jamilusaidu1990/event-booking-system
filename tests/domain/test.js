const test = require("node:test");
const assert = require("node:assert/strict");
const { Event } = require("../../src");
function createTestEvent() {
    const event = new Event("Test Meetup", 2);
    event.addTicketTier("Regular", 5000, 2);
    event.addTicketTier("VIP", 10000, 2);
    return event;
}

test("booking receives a reference code", () => {
    const event = createTestEvent();
    const result = event.createBooking("Jamilu", "Regular");

    assert.equal(result.status, "booked");
    assert.equal(result.booking.reference, "BK1001");
});

test("event capacity cannot be exceeded", () => {
    const event = createTestEvent();

    event.createBooking("Jamilu", "Regular");
    event.createBooking("Maryam", "VIP");

    const result = event.createBooking("Fatima", "Regular");

    assert.equal(result.status, "waitlisted");
    assert.equal(event.bookings.size, 2);
});

test("booking can be found by reference", () => {
    const event = createTestEvent();
    const result = event.createBooking("Jamilu", "Regular");

    assert.equal(
        event.findBooking(result.booking.reference).customerName,
        "Jamilu"
    );
});

test("cancellation promotes the first person on the waitlist", () => {
    const event = createTestEvent();

    const first = event.createBooking("Jamilu", "Regular");
    event.createBooking("Maryam", "VIP");
    event.createBooking("Fatima", "Regular");
    event.createBooking("Musa", "VIP");

    const result = event.cancelBooking(first.booking.reference);

    assert.equal(result.cancelled.customerName, "Jamilu");
    assert.equal(result.promoted.customerName, "Fatima");
    assert.equal(event.bookings.size, 2);
    assert.equal(event.waitlist.size, 1);
});

test("unknown ticket tiers are rejected", () => {
    const event = createTestEvent();

    assert.throws(
        () => event.createBooking("Ali", "Gold"),
        /Unknown ticket tier/
    );
});

test("cancelling a nonexistent booking is rejected", () => {
    const event = createTestEvent();

    assert.throws(
        () => event.cancelBooking("INVALID"),
        /Booking not found/
    );
});