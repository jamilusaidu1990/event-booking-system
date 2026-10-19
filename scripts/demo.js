const { Event } = require("../src");

const event = new Event("Backend Developers Meetup", 2);

event.addTicketTier("Regular", 5000, 10);
event.addTicketTier("VIP", 10000, 5);

console.log("\n=== EVENT BOOKING DEMO ===");
console.log(`Event: ${event.name}`);
console.log(`Capacity: ${event.capacity}`);

const first = event.createBooking("Jamilu", "Regular");
const second = event.createBooking("Maryam", "VIP");

console.log("\nConfirmed bookings:");
console.log(first.booking);
console.log(second.booking);

const third = event.createBooking("Fatima", "Regular");
const fourth = event.createBooking("Musa", "VIP");

console.log("\nCapacity reached:");
console.log("Fatima:", third.status);
console.log("Musa:", fourth.status);

console.log("\nBooking lookup:");
console.log(event.findBooking("BK1001"));

console.log("\nCancelling Jamilu's booking:");
const result = event.cancelBooking("BK1001");

console.log("Cancelled:", result.cancelled.customerName);
console.log(
    "Next person promoted:",
    result.promoted ? result.promoted.customerName : "Nobody"
);

console.log("\nRemaining bookings:");
for (const booking of event.bookings.values()) {
    console.log(booking.reference, booking.customerName);
}

console.log("\nRemaining waitlist:", event.waitlist.size);
console.log("\n=== ERROR HANDLING TEST ===");

try {
    event.createBooking("Ali", "Gold");
} catch (error) {
    console.log("Error handled:", error.message);
}
