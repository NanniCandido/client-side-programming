 /*
Author:
Date: 2/8/2024
Description: Get date from an API of the 
https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1

*/ 
const apiDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const valueMap = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'JACK': 11, 'QUEEN': 12, 'KING': 13, 'ACE': 14};
//const suitMap = ['DIAMONDS','HEARTS', 'SPADES','CLUBS'];

//(function() {
  // Task 1: Retrieve and Persist a Deck of Cards from the API
  async function fetchDeck() {
      const response = await fetch(apiDeck);
      const dataDeck = await response.json();

      let htmlText = `Deck ID is: ${dataDeck.deck_id}`;  
      let deckId = dataDeck.deck_id;
      fetchDeckHand(deckId);

   }  

  // Task 2: Request Five Cards from the Deck
  async function fetchDeckHand(token) {

    //invoke to replaceURL function to replace <<deck_id>> for the token generated at the first fetch
    apiDeckHand = replaceURL(token, 'https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=5');

    const response = await fetch(apiDeckHand);
    const dataDeckHand = await response.json();

    displayHand(dataDeckHand);

 }   

// function to replace the token in the URL
 function replaceURL(token, url) {

    let wordToReplace = "<<deck_id>>";
    let newURL = url.replace(wordToReplace, token);
    return newURL;

 }

  // Task 3: Display the Hand in a Web Page
  function displayHand(dataDeckHand) {
    let htmlText =  " ";      
 
    //console.log(dataDeckHand);

    dataDeckHand.cards.forEach(card => {
      htmlText += `"Card code: "${card.code + "   - Card value: " + card.value + "   - Card suit: " + card.suit+ "   - Card image: " + card.image}<br><br>`;

    });
    apiDivTxt.innerHTML += htmlText;
    apiImg1.src = dataDeckHand.cards[0].image;
    apiImg2.src = dataDeckHand.cards[1].image;
    apiImg3.src = dataDeckHand.cards[2].image;
    apiImg4.src = dataDeckHand.cards[3].image;
    apiImg5.src = dataDeckHand.cards[4].image;

    //console.log(testPokerHands(dataDeckHand.cards));

    let bestHand = testPokerHands(dataDeckHand.cards);

    apiDivTxt.innerHTML += `<br><b>My best Hand is an ${bestHand}</b><br><br>`;

  }

    //insert the image on the screen
    const apiImg1 = document.getElementById("image1");
    const apiImg2 = document.getElementById("image2");
    const apiImg3 = document.getElementById("image3");
    const apiImg4 = document.getElementById("image4");
    const apiImg5 = document.getElementById("image5");
    apiImg1.innerHTML;
    apiImg2.innerHTML;
    apiImg3.innerHTML;
    apiImg4.innerHTML;
    apiImg5.innerHTML;

    //insert the text on the screen
    const apiDivTxt = document.getElementById("cards");
    apiDivTxt.innerHTML += "<h2>My current hand</h2>";
  
    //call the irst fetch
    fetchDeck();

  // Task 4: Write a Function to Determine the Highest Poker Hand
  function testPokerHands(cards) {

    // Sort the cards by ascendent value
    cards.sort((a, b) => {
        return valueMap[a.value] - valueMap[b.value];
    });

    const suits = cards.map(card => card.suit); //get the suit of the cards
    const values = cards.map(card => card.value); // get the real value of the cards

    //create these variables to get value of JACK, QUEEN, KING, and ACE
    const valuesNum = cards.map(card => valueMap[card.value]); // get the mapped value when the value is JACK, QUEEN, KING or ACE
    const biggestNum = parseInt(valuesNum[4]); // get the last number of the sorted array 

    const isFlush = suits.every(suit => suit === suits[0]); // verify if all the suits are the same
    // verify if all cards are in a sequence, it compares the current value with the previous value
    const isStraight = values.every((value, index) => index === 0 || valueMap[value] === valueMap[values[index - 1]] + 1);
    // verify how many unique values the array has
    const numUniqueValues = new Set(values).size;

    if (isFlush && isStraight && values[0] === '10') return 'Royal Flush';
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
    return `High Card: ${values[4]} (${biggestNum}) of ${suits[4]}`;
 
}

  // Task 5: Wrap the Entire Application in an IIFE
  //     


