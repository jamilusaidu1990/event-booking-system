
# Event Booking System

A terminal-based event booking system built with JavaScript and Node.js.

## Features

- Create events with a fixed capacity.
- Add ticket tiers with prices and available quantities.
- Create bookings with unique booking references.
- Look up bookings using a Map.
- Add customers to a FIFO waitlist when capacity or ticket availability is exhausted.
- Cancel bookings and promote the next eligible customer from the waitlist.
- Handle invalid ticket tiers and missing bookings with errors.

## Technologies

- JavaScript
- Node.js
- Git and GitHub
- Node.js built-in test runner

## Getting Started

Make sure Node.js is installed.

Clone the repository:

```bash
git clone https://github.com/jamilusaidu1990/event-booking-system.git
cd event-booking-system
```

Run the demo:

```bash
npm run demo
```

Run the tests:

```bash
npm test
```

Run the benchmark:

```bash
npm run benchmark
```

## Data Structures and Complexity

- `Map`: Used to store ticket tiers and bookings for efficient lookup. `Map.get()` has average-case O(1) lookup complexity.
- FIFO waitlist: A linked-list queue processes waiting customers in arrival order.
- `Array.find()`: Performs a linear search with O(n) worst-case time complexity.

## Test Results

The project currently includes six automated tests covering booking references, event capacity, booking lookup, waitlist promotion, invalid ticket tiers, and cancellation errors.

All six tests passed in the latest test run.

## Benchmark

The latest local benchmark reported:

- `Array.find()`: 14.026 seconds
- `Map.get()`: 0.691 milliseconds

These are results from one local run. Actual performance varies with the dataset, runtime, and machine.

## Project Structure

```text
event-booking-system/
├── scripts/
│   ├── benchmark.js
│   └── demo.js
├── src/
│   ├── domain/
│   │   ├── booking.js
│   │   ├── event.js
│   │   ├── ticket.js
│   │   └── waitlist.js
│   ├── utils/
│   │   └── errors.js
│   └── index.js
├── tests/
│   └── domain/
│       └── test.js
├── .gitignore
├── package.json
└── README.md
```

## Project Status

Build 1: Domain Core.
