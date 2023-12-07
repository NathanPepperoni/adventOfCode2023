import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const Type = {
  FIVE_OF_KIND: 6,
  FOUR_OF_KIND: 5,
  FULL_HOUSE: 4,
  THREE_OF_KIND: 3,
  TWO_PAIR: 2,
  ONE_PAIR: 1,
  HIGH_CARD: 0,
};

class Hand {
  cards = [];
  bid;

  constructor(handString, bid) {
    for (let i = 0; i < 5; i++) {
      this.cards.push(this.getCardValue(handString[i]));
    }
    this.bid = Number(bid);
  }

  getCardValue(char) {
    switch (char) {
      case "A":
        return 14;
      case "K":
        return 13;
      case "Q":
        return 12;
      case "J":
        return 11;
      case "T":
        return 10;
      default:
        return Number(char);
    }
  }
}

const isntEmpty = (item) => item;

function getCategory(hand) {
  const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let uniqueCount = 0;
  for (let i = 0; i < 5; i++) {
    if (arr[hand.cards[i] - 2] === 0) {
      uniqueCount++;
    }
    arr[hand.cards[i] - 2] += 1;
  }

  if (uniqueCount === 1) {
    return Type.FIVE_OF_KIND;
  }
  if (uniqueCount === 2) {
    return arr.includes(4) ? Type.FOUR_OF_KIND : Type.FULL_HOUSE;
  }
  if (uniqueCount === 3) {
    return arr.includes(3) ? Type.THREE_OF_KIND : Type.TWO_PAIR;
  }
  if (uniqueCount === 4) {
    return Type.ONE_PAIR;
  }
  return Type.HIGH_CARD;
}

function simpleStrengthCompare(handA, handB) {
  for (let i = 0; i < 5; i++) {
    const cardA = handA.cards[i]
    const cardB = handB.cards[i]
    if (cardA > cardB) {
      return 1;
    }
    if (cardA < cardB) {
      return -1;
    }
  }
  return 0;
}

function star13() {
  const input = loadPuzzleInput(7).filter(isntEmpty);

  const hands = input.map((row) => {
    const split = row.split(" ");
    return new Hand(split[0], Number(split[1]));
  });

  const sortedHands = hands.sort((handA, handB) => {
    const typeA = getCategory(handA);
    const typeB = getCategory(handB);

    if (typeA > typeB) {
      return 1;
    }
    if (typeA < typeB) {
      return -1;
    }
    if (typeA === typeB) {
      return simpleStrengthCompare(handA, handB);
    }
  });

  let sum = 0;
  let rank = 1;
  sortedHands.forEach((hand) => {
    sum += rank * hand.bid;
    rank++;
  });

  return sum;
}

export default star13;
