function testPokerHands(cards) {
    // Sort the cards by value
    cards.sort((a, b) => {
        const valueMap = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'JACK': 11, 'QUEEN': 12, 'KING': 13, 'ACE': 14};
        return valueMap[a.value] - valueMap[b.value];
    });

    const suits = cards.map(card => card.suit);
    const values = cards.map(card => card.value);

    
    const isFlush = Flush(suits);

    const isStraight = Straight(values);

    const numUniqueValues = new Set(values).size;

    const isRoyalFlush = RoyalFlush(isFlush, isStraight, values);
   
    if (isRoyalFlush) return 'Royal Flush';

    if (isFlush && isStraight) return 'Straight Flush';

    if (numUniqueValues === 2) {
        const counts = {};
        for (const value of values) {
            counts[value] = counts[value] ? counts[value] + 1 : 1;
        }
        if (Object.values(counts).some(count => count === 4)) return 'Four of a Kind';
        if (Object.values(counts).some(count => count === 3)) return 'Full House';
    }
    if (isFlush) return 'Flush';
    if (isStraight) return 'Straight';
    if (numUniqueValues === 3) {
        const counts = {};
        for (const value of values) {
            counts[value] = counts[value] ? counts[value] + 1 : 1;
        }
        if (Object.values(counts).some(count => count === 3)) return 'Three of a Kind';
        if (Object.values(counts).filter(count => count === 2).length === 2) return 'Two Pair';
    }
    if (numUniqueValues === 4) return 'Pair';
    return 'High Card';
}

function Flush(suits) {

    return suits.every(suit => suit === suits[0]);

}

function Straight(values) {

    return values.every((value, index) => index === 0 || valueMap[value] === valueMap[values[index - 1]] + 1);
}

function RoyalFlush(isFlush, isStraight, values) {

    if (isFlush && isStraight && values[0] === '10') {
        return true;
    }
    return false;
}