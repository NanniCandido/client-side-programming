function testPokerHands(cards) {
    cards.sort((a, b) => {
        const valueMap = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'JACK': 11, 'QUEEN': 12, 'KING': 13, 'ACE': 14};
        return valueMap[a.value] - valueMap[b.value];
    });

    const suits = cards.map(card => card.suit);
    const values = cards.map(card => card.value);

    //create these variables to get value of JACK, QUEEN, KING, and ACE
    const valuesNum = cards.map(card => valueMap[card.value]); // get the mapped value when the value is JACK, QUEEN, KING or ACE
    const biggestNum = parseInt(valuesNum[4]); // get the last number of the sorted array    

    if (isRoyalFlush(suits, values))    return 'Royal Flush';
    if (isStraightFlush(suits, values)) return 'Straight Flush';
    if (isFourOfAKind(values))          return 'Four of a Kind';
    if (isFullHouse(values))            return 'Full House';
    if (isFlush(suits))                 return 'Flush';
    if (isStraight(values))             return 'Straight';
    if (isThreeOfAKind(values))         return 'Three of a Kind';
    if (isTwoPair(values))              return 'Two Pair';
    if (isPair(values))                 return 'Pair';
    
    return `High Card is ${biggestNum}`;
}

function isRoyalFlush(suits, values) {
    const isFlush = suits.every(suit => suit === suits[0]);
    const isStraight = values.every((value, index) => index === 0 || valueMap[value] === valueMap[values[index - 1]] + 1);
    return isFlush && isStraight && values[0] === '10';
}

function isStraightFlush(suits, values) {
    const isFlush = suits.every(suit => suit === suits[0]);
    const isStraight = values.every((value, index) => index === 0 || valueMap[value] === valueMap[values[index - 1]] + 1);
    return isFlush && isStraight;
}

function isFourOfAKind(values) {
    const counts = countValues(values);
    return Object.values(counts).some(count => count === 4);
}

function isFullHouse(values) {
    const counts = countValues(values);
    return Object.values(counts).some(count => count === 3) && Object.values(counts).some(count => count === 2);
}

function isFlush(suits) {
    return suits.every(suit => suit === suits[0]);
}

function isStraight(values) {
    return values.every((value, index) => index === 0 || valueMap[value] === valueMap[values[index - 1]] + 1);
}

function isThreeOfAKind(values) {
    const counts = countValues(values);
    return Object.values(counts).some(count => count === 3);
}

function isTwoPair(values) {
    const counts = countValues(values);
    return Object.values(counts).filter(count => count === 2).length === 2;
}

function isPair(values) {
    const counts = countValues(values);
    return Object.values(counts).some(count => count === 2);
}

function countValues(values) {
    const counts = {};
    for (const value of values) {
        counts[value] = counts[value] ? counts[value] + 1 : 1;
    }
    return counts;
}
