function mergeSort(items, compare) {
    if (items.length <= 1) {
        return items;
    }

    const middle = Math.floor(items.length / 2);

    const left = mergeSort(items.slice(0, middle), compare);
    const right = mergeSort(items.slice(middle), compare);

    return merge(left, right, compare);
}

function merge(left, right, compare) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (compare(left[i], right[j]) <= 0) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i), right.slice(j));
}

module.exports = { mergeSort };