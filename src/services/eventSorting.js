const { mergeSort } = require("./mergeSort");

function getEventPrice(event) {
    if (Number.isFinite(event.price)) {
        return event.price;
    }

    const tiers = event.ticketTiers instanceof Map
        ? [...event.ticketTiers.values()]
        : [];

    if (tiers.length === 0) {
        return Infinity;
    }

    return Math.min(...tiers.map(tier => tier.price));
}

function getEventAvailability(event) {
    if (Number.isFinite(event.available)) {
        return event.available;
    }

    const tiers = event.ticketTiers instanceof Map
        ? [...event.ticketTiers.values()]
        : [];

    return tiers.reduce(
        (total, tier) => total + tier.quantity,
        0
    );
}

function sortEvents(events, sortBy = "date") {
    const comparators = {
        date: (a, b) => a.date.localeCompare(b.date),
        price: (a, b) => getEventPrice(a) - getEventPrice(b),
        availability: (a, b) =>
            getEventAvailability(b) - getEventAvailability(a)
    };

    const compare = comparators[sortBy];

    if (!compare) {
        throw new Error(`Unsupported sort option: ${sortBy}`);
    }

    return mergeSort(events, compare);
}

module.exports = {
    sortEvents,
    getEventPrice,
    getEventAvailability
};