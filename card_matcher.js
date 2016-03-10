


var keys = { 

};


var matcherModel = {
  numPairs: 2,
  cards: ["A", "B", "A", "B"],

  Card: function(id, value) {
    this.id = id;
    this.value = value;
  },

  addPair : function() {
    var firstCard = new this.Card();  //need params here
    var secondCard = new this.Card();
  },

  currentId: 1;

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

