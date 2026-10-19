class TicketTier {
    constructor(name, price, quantity) {
        if (!name || price < 0 || quantity < 0) {
            throw new Error("Invalid ticket tier details");
        }

        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

module.exports = { TicketTier };