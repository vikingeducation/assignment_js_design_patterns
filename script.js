$(document).ready(function() {
  var gridSize = prompt("How big of a grid?");
  Controller.init(gridSize);
});

var View = {

  init: function(size) {
    this.grid = $('#grid');
    this.renderCards();
    this.flipCard(size);
  },

  flipCard: function(size) {
    $('#grid').on('click', '.card', function(e) {
      var cardId = $(this).attr('data-id');
      Controller.sendCard(cardId);
    });
  },

  renderCards: function() {
    if (Controller.getGameOver()) {
      alert('You win, refresh the page to play again!');
    }
    var attempts = Controller.getAttempts();
    var correct = Controller.getCorrect();
    this.grid.html("");
    var cardIds = Controller.getCardIds();
    var cards = Controller.getCards();
    for (var i = 0; i < cardIds.length; i++) {
      this.render(cards, cardIds[i]);
    }
    $("#attempts").text("Attempts " + String(attempts) + " Correct " + String(correct));
  },

  render: function(cards, id) {
    var randCard = cards[String(id)];
    var newCard = this.buildCardDiv(randCard, id)
    this.grid.append(newCard);
  },

  buildCardDiv: function(card, id) {
    if (card.flipped) {
      return this.buildFlippedCard(card, id);
    } else {
      return $('<div class="card back"></div>')
        .attr('data-id', id)
        .text(card.value);
    }
  },

  buildFlippedCard: function(card, id) {
    if (card.matched) {
      return $('<div class="card matched flipped"></div>')
      .attr('data-id', id)
      .text(card.value);
    } else {
    return $('<div class="card flipped"></div>')
      .attr('data-id', id)
      .text(card.value);
    }
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
    var matches = Model.updateCard(cardId);
    if (matches.length >= 2) {
      setTimeout(function() {
        Model.compareCards(matches);
      }, 1000);
    }
  },

  getAttempts: function() {
    return Model.attempts;
  },

  renderPage: function() {
    View.renderCards(Object.keys(Model.cards).length / 2);
  },

  getCardIds: function() {
    var orig = Model.cardIds;
    return orig.slice(0);
  },

  getCorrect: function() {
    return Model.correct;
  },

  getGameOver: function() {
    return Model.gameOver();
  }
};

var Model = {
  init: function(size) {
    this.cards = {};
    this.buildDeck(size);
    this.getOrder(size);
  },

  buildDeck: function(size) {
    for (var i = 1; i <= Number(size) * 2; i += 2) {
      this.cards[String(i)] = new Card(String(i));
      this.cards[String(i + 1)] = new Card(String(i));
    }
  },

  matches: [],
  cardIds: [],

  attempts: 0,
  correct: 0,

  compareCards: function(matches) {
    if (this.cards[matches[0]].value === this.cards[matches[1]].value) {
      this.setMatched(matches);
    } else {
      this.setFlipped(matches);
    }
    this.matches = [];
    this.attempts += 1;
    Controller.renderPage();
  },

  setMatched: function(arr) {
    this.cards[arr[0]].matched = true;
    this.cards[arr[1]].matched = true;
    this.correct++;
  },

  setFlipped: function(arr) {
    this.cards[arr[0]].flipped = false;
    this.cards[arr[1]].flipped = false;
  },

  updateCard: function(cardId) {
    this.cards[cardId].flipped = true;
    this.matches.push(cardId);
    Controller.renderPage();
    return this.matches
  },

  getOrder: function(size) {
    var ids = [];
    for (var i = 1; i <= Number(size) * 2; i++) {
      ids.push(i);
    }

    this.cardIds = this.shuffle(ids);
  },

  gameOver: function() {
    for (var id in this.cards) {
      console.log(this.cards[id]);
      if (this.cards[id].matched === false ) {
        return false
      }
    }
    return true;
  },

  shuffle: function(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
  },
};

function Card (value) {
  this.value = value;
  this.flipped = false;
  this.matched = false;
}
