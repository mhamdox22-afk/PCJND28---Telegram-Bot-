function checkarray(item, array) {
    for (let index = 0; index < array.length; index++) {
        if (array[index] == item) {
            return true;
        }
    }
    return false;
}

function isValidNumber(value) {
    return typeof parseFloat(value) === 'number' && !isNaN(value);
}

function isPositiveInteger(value) {
    return parseInt(value) % 1 === 0 && !isNaN(Number(value, 10)) && parseInt(value) >= 0;
}

module.exports = {
    checkarray,
    isValidNumber,
    isPositiveInteger
};
