class Booking {
    constructor(reference, customerName, ticketType) {
        this.reference = reference;
        this.customerName = customerName;
        this.ticketType = ticketType;
        this.status = "confirmed";
    }
}

module.exports = { Booking };