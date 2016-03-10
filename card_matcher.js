var matcherModel = {
  size: 4,
  cards: [],
  numGuesses: 0,
  matchedCards: 0,
  totalCards: 0,

  gameStateText: "You haven't won yet.  Keep going.",

  possibleValues: ["A", "B", "C", "D", "E", "F", "G", "H",
      "I", "J", "K" ],

  init: function(size) {
    this.size = size;
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

  sameCard: function( id ) {
    return ( this.selectedCard && id === this.selectedCard.id )
  },

  checkGuess: function(cardId) {
    this.numGuesses++;
    var guessedCard = this.getCard(cardId);
    var correct = this.selectedCard.matches(guessedCard);
    if( correct) {
      this.matchedCards += 2;
    }
    
    this.selectedCard = null;

    if( this.matchedCards === this.totalCards )
    {
      this.gameStateText = "Congratulations, you won!"
    }

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
    this.totalCards += 2;
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
    $('#card-' + cardId).off('click');
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

  updateGameView: function( ) {
    var $gameState = $('#game-state-text');
    $gameState.text( this.model.gameStateText );

    var $numGuesses = $('#num-guesses');
    $numGuesses.text(this.model.numGuesses );

    var $totalCards = $('#total-cards');
    $totalCards.text(this.model.totalCards );

    var $matchedCards = $('#matched-cards');
    $matchedCards.text(this.model.matchedCards );
  }

};

var matcherController = {

  model: matcherModel,
  view: matcherView,

  init: function(size) {
    this.model.init(size);
    this.view.init();
  },

  selecting: false,

  selectCard: function(cardId) {
    if (this.selecting) {
      return;
    }
    this.selecting = true;

    if( this.model.sameCard(cardId) ) {
      this.selecting = false;
      return;
    }

    this.view.revealCard(cardId);

    if (this.model.selectedCard) {
      // make guess
      var selectedCard = this.model.selectedCard;
      var correct = this.model.checkGuess(cardId);
      this.view.updateGameView( );

      if (correct) {
        var that = this;
        setTimeout(
            function() {
              that.view.setCorrect(cardId);
              that.view.setCorrect(selectedCard.id);
              that.selecting = false;
            }
        , 500);
      } else {
        var that = this;
        setTimeout(
          function(){
            that.view.hideCards();
            that.selecting = false;
          }
          , 1000);
      }

    } else {
      // select first card
      this.model.setSelectedCard(cardId);
      this.selecting = false;
    }
  }
};

$(document).ready(function() {
  $('input[type=submit]').click(function(e) {
    e.preventDefault();
    var size = $('#grid_size').val();
    matcherController.init(size);
    $(this).closest('form').hide();
    $('.card').animate({opacity: 1});
  })

})
