$(document).ready(function() {
  var gridSize = prompt("How big of a grid?");
  Controller.init(gridSize);
});

var View = {
  init: function(size) {
    this.grid = $('.grid')
    this.renderCards();
  },

  renderCards: function() {
    var cards = Controller.getCards();
    while(cards[0]) {
      cards = this.render(cards);
    };
  },

  render: function(cards) {
    var rand = Math.floor(Math.random() * cards.length);
    var randCard = cards[rand];
    cards.splice(rand, 1);
    var newCard = this.buildCardDiv(randCard)
    this.grid.append(newCard);
    return cards;
  },

  buildCardDiv: function(card) {
    return $('<div class="card"></div>')
        .attr('data-id', card.value)
        .text(card.value);
  }
};

var Controller = {
  init: function(size) {
    Model.init(size);
    View.init();
  },

  getCards: function() {
    return Model.cards;
  }
};

var Model = {
  init: function(size) {
    this.cards = [];
    this.buildDeck(size);
  },

  buildDeck: function(size) {
    for (var i = 1; i <= Number(size); i++) {
      this.cards.push(new Card(String(i)));
      this.cards.push(new Card(String(i)));
    }
  }
};

function Card (value) {
  this.value = value;
  this.flipped = false;
}