var matcherModel = {
  size: 4,
  cards: [],
  possibleValues: ["A", "B", "C", "D", "E", "F", "G"],

  init: function() {
    var totalPairs = Math.pow(this.size, 2) / 2;
    for (var i = 0; i < totalPairs; ++i) {
      this.addPair();
    }
    this.shuffle();
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

  selectedCard: null,

  setSelectedCard: function(cardId) {
    this.selectedCard = this.getCard(cardId);
  },

  checkGuess: function(cardId) {
    var guessedCard = this.getCard(cardId);
    var correct =  this.selectedCard.matches(guessedCard);
    this.selectedCard = null;
    return correct;
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

  shuffle: function() {
    var currentIndex = this.cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
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


var matcherView = {

  model: matcherModel,

  init: function() {

    this.$grid = $('#matcher-grid');

    this.render();
  },

  render: function() {
    this.addCardsToGrid();
    var width = 100.0 / this.model.size - 2;
    $('.card').css({
      width: width + "%"
    });

    $('.card').click(function(e){
      matcherController.selectCard($(this).data('card-id'))
    });
  },

  revealCard: function(cardId) {
    $('#card-' + cardId).addClass('revealed');
  },

  setCorrect: function(cardId) {
    $('#card-' + cardId).addClass('correct');
  },

  hideCards: function() {
    $('.card').not('.correct').removeClass('revealed');
  },

  addCardsToGrid: function() {
    for( var i = 0; i < this.model.cards.length; i++ ) {
      var card = this.model.cards[i];
      var $cardDiv = $("<div> <div class='name'>" + card.value.toString() + "</div></div>");
      $cardDiv.addClass('card');
      $cardDiv.data( 'card-id', card.id );
      $cardDiv.attr( 'id', 'card-' + card.id );
      this.$grid.append($cardDiv);
    }
  },

};

var matcherController = {

  model: matcherModel,
  view: matcherView,

  init: function() {
    this.model.init();
    this.view.init();
  },

  selectCard: function(cardId) {
    this.view.revealCard(cardId);

    if (this.model.selectedCard) {
      var selectedCard = this.model.selectedCard;
      var correct = this.model.checkGuess(cardId);
      if (correct) {
        this.view.setCorrect(cardId);
        this.view.setCorrect(selectedCard.id);
      } else {
        this.view.hideCards();
      }
    } else {
      this.model.setSelectedCard(cardId);
    }
  }
};

$(document).ready(function() {
  matcherController.init();
})

