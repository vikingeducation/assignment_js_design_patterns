$(document).ready(function() {
  var gridSize = prompt("How big of a grid?");
  Controller.init(gridSize);
});

var View = {

  init: function(size) {
    this.grid = $('.grid')
    this.renderCards(size);
    this.flipCard();
  },

  flipCard: function() {
    $('.grid').on('click', '.card', function(e) {
      var cardId = $(this).attr('data-id');
      Controller.sendCard(cardId);
    });
  },

  renderCards: function(size) {
    $('.grid').innerHTML = "";
    var cardIds = this.buildCardIds(size);
    var cards = Controller.getCards();
    while(cardIds[0]) {
      cardIds = this.render(cardIds, cards);
    };
  },

  buildCardIds: function(size) {
    var cardIds = [];
    for (var i = 1; i <= Number(size) * 2; i++) {
      cardIds.push(i);
    }
    return cardIds;
  },

  render: function(cardIds, cards) {
    var rand = Math.floor(Math.random() * cardIds.length);
    var id = cardIds[rand];
    var randCard = cards[String(id)];
    cardIds.splice(rand, 1);
    var newCard = this.buildCardDiv(randCard, id)
    this.grid.append(newCard);
    return cardIds;
  },

  buildCardDiv: function(card, id) {
    if (card.flipped) {
      if (card.matched) {
        return $('<div class="card matched flipped"></div>')
        .attr('data-id', id)
        .text(card.value);
      }
      return $('<div class="card flipped"></div>')
        .attr('data-id', id)
        .text(card.value);
    } else {
      return $('<div class="card back"></div>')
        .attr('data-id', id)
        .text(card.value);
    }
  },

  yesMatch: function() {
    $('.seekingLove').removeClass('seekingLove').addClass('flipped')
    this.addAttempt();
  },

  noMatch: function() {
    $('.seekingLove').removeClass('seekingLove').addClass('back');
    this.addAttempt();
  },

  addAttempt: function() {
    $('.attempt').text(Controller.getAttempts);
  }
};

var Controller = {
  init: function(size) {
    Model.init(size);
    View.init(size);
  },

  getCards: function() {
    return Model.cards;
  },

  sendCard: function(cardId) {
    Model.updateCard(cardId);
  },

  stayUp: function() {
    View.yesMatch();
  },

  flipDown: function() {
    setTimeout(View.noMatch, 1000);
  },

  getAttempts: function() {
    return Model.getAttempts;
  },

  renderPage: function() {
    View.renderCards(Object.keys(Model.cards).length);
  }
};

var Model = {
  init: function(size) {
    this.cards = {};
    this.buildDeck(size);
  },

  buildDeck: function(size) {
    for (var i = 1; i <= Number(size) * 2; i += 2) {
      this.cards[String(i)] = new Card(String(i));
      this.cards[String(i + 1)] = new Card(String(i));
    }
  },

  matches: [],

  attempts: 0,

  compareCards: function(matches) {
    if (matches[0].value === matches[1].value) {
      matches[0].matched = true;
      matches[1].matched = true;
      Controller.renderPage();
    } else {
      matches[0].flipped = false;
      matches[1].flipped = false;
      Controller.renderPage();
    }

    this.matches = [];
    this.attempts += 1;
  },

  updateCard: function(cardId) {
    var card = this.cards[cardId];
    card.flipped = true;
    this.matches.push(card);
    if (this.matches.length === 2) {
      this.compareCards(this.matches);
    }
  },

  getAttempts: function() {
    return attempts;
  },
};

function Card (value) {
  this.value = value;
  this.flipped = false;
  this.matched = false;
}
