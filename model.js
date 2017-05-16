"use strict";

var model = {
  cardCount: 0,
  deck: [],
  currentScore: 0,
  attemptsMade: 0,
  openCard: {},
  matchedCards: [],
  imgCount: 39,
  imgIds: [],

  reset: function() {
    this.cardCount = 0;
    this.deck = [];
    this.currentScore = 0;
    this.attemptsMade = 0;
    this.openCard = {};
    this.matchedCards = [];
  },

  addMatchedCards: function(card) {
    if (this.matchedCards.indexOf(card) < 0) {
      this.matchedCards.push(card);
    }
  },

  allCardsMatched: function() {
    return this.matchedCards.length === this.cardCount
  },

  setOpenCard: function(value, id) {
    if (value === undefined) {
      this.openCard = {};
    } else {
      this.openCard[value] = id;
    }
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

  getImageIds: function() {
    while (this.imgIds.length < this.cardCount) {
      var id = Math.floor(Math.random() * this.imgCount + 1);
      if (this.imgIds.indexOf(id) < 0) {
        this.imgIds.push(id);
      }
    }
    this.imgIds = this.imgIds.concat(this.imgIds);
  },

  generateDeck: function() {
    this.getImageIds();
    for (var n = 1; n <= 2; n++) {
      for (var i = 1; i <= this.cardCount; i++) {
        var index = Math.floor(Math.random() * this.cardCount + 1)
        this.deck.splice(index, 0, this.imgIds.pop());
      }
    }
  },

  setCardCount: function(num) {
    this.cardCount = num;
  },

  getCardCount: function() {
    return this.cardCount;
  }

}