"use strict";

var model = {
  cardCount: 0,
  deck: [],
  currentScore: 0,
  attemptsMade: 0,
  openCard: undefined,
  matchedCards: 0,

  reset: function() {
    this.cardCount = 0;
    this.deck = [];
    this.currentScore = 0;
    this.attemptsMade = 0;
    this.openCard = undefined;
    this.matchedCards = [];
  },

  addMatchedCards: function(card) {
    this.matchedCards++;
  },

  allCardsMatched: function() {
    return this.matchedCards === this.cardCount
  },

  setOpenCard: function(card) {
    this.openCard = card;
  },

  getOpenCard: function() {
    return this.openCard;
  },

  getAttemptsMade: function() {
    return this.attemptsMade;
  },

  addAttempt: function() {
    this.attemptsMade++;
  },

  deductPoints: function(points) {
    this.currentScore -= points;
  },

  addPoints: function(points) {
    this.currentScore += points;
  },

  getScore: function() {
    return this.currentScore;
  },

  getDeck: function() {
    return this.deck;
  },

  generateDeck: function() {
    for (var n = 1; n <= 2; n++) {
      for (var i = 1; i <= this.cardCount; i++) {
        var index = Math.floor(Math.random() * this.cardCount + 1)
        this.deck.splice(index, 0, i);
      }
    }
    console.log(this.deck);
  },

  setCardCount: function(num) {
    this.cardCount = num;
  },

  getCardCount: function() {
    return this.cardCount;
  }

}