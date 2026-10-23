const { Booking } = require("./booking");
const { Waitlist } = require("./waitlist");
const { AppError } = require("../utils/errors");

class Event {
    constructor(name, capacity, details = {}) {
        if (!name || !Number.isInteger(capacity) || capacity < 1) {
            throw new AppError("Event needs a name and positive capacity");
        }

        this.name = name;
        this.capacity = capacity;
        this.city = details.city || "";
        this.date = details.date || "";
        this.description = details.description || "";
        this.ticketTiers = new Map();
        this.bookings = new Map();
        this.waitlist = new Waitlist();
        this.nextReference = 1001;
    }

    addTicketTier(name, price, quantity) {
        if (this.ticketTiers.has(name)) {
            throw new AppError("Ticket tier already exists");
        }

        if (
            !Number.isFinite(price) ||
            price < 0 ||
            !Number.isInteger(quantity) ||
            quantity < 0
        ) {
            throw new AppError("Invalid ticket price or quantity");
        }

        this.ticketTiers.set(name, { name, price, quantity });
    }

    createBooking(customerName, ticketType) {
        if (!customerName || !customerName.trim()) {
            throw new AppError("Customer name is required");
        }

        const tier = this.ticketTiers.get(ticketType);

        if (!tier) {
            throw new AppError(`Unknown ticket tier: ${ticketType}`);
        }

        if (this.bookings.size >= this.capacity || tier.quantity <= 0) {
            this.waitlist.enqueue({ customerName, ticketType });

            return {
                status: "waitlisted",
                position: this.waitlist.size
            };
        }

        return {
            status: "booked",
            booking: this.confirmBooking(customerName, ticketType)
        };
    }

    confirmBooking(customerName, ticketType) {
        const tier = this.ticketTiers.get(ticketType);
        tier.quantity--;

        const reference = `BK${this.nextReference++}`;

        const booking = new Booking(
            reference,
            customerName,
            ticketType
        );

        this.bookings.set(reference, booking);
        return booking;
    }

    findBooking(reference) {
        return this.bookings.get(reference) || null;
    }

    cancelBooking(reference) {
        const booking = this.bookings.get(reference);

        if (!booking) {
            throw new AppError(`Booking not found: ${reference}`);
        }

        this.bookings.delete(reference);
        this.ticketTiers.get(booking.ticketType).quantity++;

        const next = this.waitlist.peek();

        if (
            next &&
            this.bookings.size < this.capacity &&
            this.ticketTiers.get(next.ticketType).quantity > 0
        ) {
            this.waitlist.dequeue();

            const promoted = this.confirmBooking(
                next.customerName,
                next.ticketType
            );

            return { cancelled: booking, promoted };
        }

        return { cancelled: booking, promoted: null };
    }
}

module.exports = { Event };