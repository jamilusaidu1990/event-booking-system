function getEventPrice(event) {
    if (Number.isFinite(event.price)) {
        return event.price;
    }

    const tiers = event.ticketTiers instanceof Map
        ? [...event.ticketTiers.values()]
        : [];

    if (tiers.length === 0) {
        return null;
    }

    return Math.min(...tiers.map(tier => tier.price));
}


function searchEvents(events, filters = {}) {
    const {
        text = "",
        city = "",
        startDate = "",
        endDate = "",
        minPrice = 0,
        maxPrice = Infinity
    } = filters;

    const query = text.toLowerCase().trim();
    const targetCity = city.toLowerCase().trim();

    return events.filter(event => {
        const matchesText =
            !query ||
            event.name.toLowerCase().includes(query) ||
            (event.description || "").toLowerCase().includes(query);

        const matchesCity =
            !targetCity ||
            (event.city || "").toLowerCase().trim() === targetCity;

        const matchesStartDate =
            !startDate || event.date >= startDate;

        const matchesEndDate =
            !endDate || event.date <= endDate;

        const price = getEventPrice(event);

        const hasPriceFilter =
            minPrice !== 0 || maxPrice !== Infinity;

        const matchesPrice =
            !hasPriceFilter ||
            (
                price !== null &&
                price >= minPrice &&
                price <= maxPrice
            );

        return (
            matchesText &&
            matchesCity &&
            matchesStartDate &&
            matchesEndDate &&
            matchesPrice
        );
    });
}

module.exports = { searchEvents };