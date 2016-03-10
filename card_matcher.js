var matcherModel = {
  size: 4,
  cards: [],
  possibleValues: ["A", "B", "C", "D", "E", "F", "G"],

  init: function() {
    var totalPairs = Math.pow(this.size, 2) / 2;
    for (var i = 0; i < totalPairs; ++i) {
      this.addPair();
    }
  },

  getCard: function(id) {
    var card;
    for (var i = 0; i < this.cards.length; ++i) {
      card = this.cards[i];
      if (card.id == id) {
        return card;
      }
    }
    return false;
  },

  Card: function(id, value) {
    this.id = id;
    this.value = value;

    this.matches = function(otherCard) {
      if (this.value == otherCard.value) {
        return true;
      } else {
        return false;
      }
    }
  },

  addPair: function() {
    var value = this.randomValue();
    var firstCard = new this.Card( this.getId(), value);
    var secondCard = new this.Card( this.getId(), value);
    this.cards.push(firstCard);
    this.cards.push(secondCard);
  },

  randomValue: function() {
    return this.possibleValues[Math.floor(Math.random() * this.possibleValues.length)];
  },

  currentId: 1,

  getId: function() {
    var id = this.currentId;
    this.currentId += 1;
    return id;
  },

};

var matcherController = {};

var matcherView = {
  init: function() {

    this.$grid = $('#matcher-grid');

    setup();
  },

  setup: function() {
    addCardsToGrid();
  },

  addCardsToGrid: function() {},

};
