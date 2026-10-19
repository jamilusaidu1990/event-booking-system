const total = 100000;
const bookings = [];
const bookingsMap = new Map();

for (let i = 0; i < total; i++) {
    const booking = {
        reference: `BK${i}`,
        customerName: `Customer ${i}`
    };

    bookings.push(booking);
    bookingsMap.set(booking.reference, booking);
}

const target = `BK${total - 1}`;
const repetitions = 10000;

console.time("Array.find");

for (let i = 0; i < repetitions; i++) {
    bookings.find(item => item.reference === target);
}

console.timeEnd("Array.find");

console.time("Map.get");

for (let i = 0; i < repetitions; i++) {
    bookingsMap.get(target);
}

console.timeEnd("Map.get");