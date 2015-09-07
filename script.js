'use strict;'


var model = {
  totalCards: 0,
  flippedCards: 0,
  currentlyFlippedCardIndex: null,
  matchedCards: 0,
  cards: [],
  values: [],
  totalMoves: 0,
  score: 0,

  init: function(numberOfCards) {
    var n = Number(numberOfCards)
    for(var i = 0; i < n; i++) {
      model.createCard();
    };
    model.totalCards = n;
    model.shuffleCards();
  },


  //Fisher-Yates (http://www.frankmitchell.org/2015/01/fisher-yates/)
  shuffleCards: function() {
    var array = model.cards
      , i = 0
      , j = 0
      , temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    };
  },


  createCard: function() {
    var newCard = {
      id: model.cards.length,
      value: model.generateValue(),
      matched: false
    };

    model.cards[newCard.id] = newCard;
  },


  generateValue: function() {
    var lastValue = model.values[model.values.length - 1];
    if (model.values.length === 0) {
      model.values[0] = 'A';
      return model.values[0];
    }
    else if (model.cards.length % 2 === 0) {
      var newValue = String.fromCharCode(lastValue.charCodeAt(0) + 1);
      model.values[model.values.length] = newValue;
      return newValue;
    }
    else {
      return lastValue;
    }
  },


  setCurrentlyFlipped: function(index) {
    model.currentlyFlippedCardIndex = index;
  },


  getCardByIndex: function(index) {
    return model.cards[index];
  },


  checkMatch: function(index) {
    var card = model.getCardByIndex(index);
    var check = model.getCardByIndex(model.currentlyFlippedCardIndex);
    if (card.value === check.value) {
      card.matched = true;
      check.matched = true;
      model.matchedCards += 2;
      model.scoreMatch();
      model.checkWin();
      view.flagMatched(index, model.currentlyFlippedCardIndex);
      view.nextTurn();
    }
    else {
      model.scoreWrong();
      setTimeout(view.nextTurn, 1500);
    }
  },


  checkWin: function() {
    if (model.totalCards === model.matchedCards) {
      view.renderGameOver();
    };
  },


  addMove: function() {
    model.totalMoves++;
    model.sendScoreboard();
  },


  scoreMatch: function() {
    model.score += 1;
    model.sendScoreboard();
  },


  scoreWrong: function() {
    model.score -= 1;
    model.sendScoreboard();
  },


  sendScoreboard: function() {
    view.refreshScoreboard(model.totalMoves, model.score);
  }

}




var view = {

  init: function() {
    // prevent odd numbers
    model.init(view.startupPrompt());
    $('.board').on('click', '.facedown', controller.pickCard);
    view.renderView();
  },

  startupPrompt: function() {
    while(true){
      var input = prompt("Enter the total number of cards (must be an even number):");
      if (input > 0 && input % 2 === 0) {
        break;
      }
      else {
        alert("Sorry, that number was invalid. Please try again.");
      }
    }
    return input;
  },


  renderView: function() {
    $(model.cards).each(function(index, cardObject) { view.renderHiddenCard(cardObject) } );
  },


  renderHiddenCard: function(cardObject) {
    $card = $(cardObject)
    var $newCard = $("<div class='card facedown'>#</div>");
    $('.board').append($newCard);
  },


  renderCard: function(cardObject) {
    $card = $(cardObject)
    var index = $card.index();
    $card.removeClass('facedown').text(model.cards[index].value);
    model.flippedCards++;
  },


  nextTurn: function() {
    $('.card').addClass('facedown').text("#");
    model.flippedCards = 0;
    $('.board').on('click', '.facedown', controller.pickCard);
  },


  flagMatched: function(index1, index2) {
    $('.board').children().eq(index1).removeClass('card').addClass('matched');
    $('.board').children().eq(index2).removeClass('card').addClass('matched');
  },


  renderGameOver: function() {
    var $results = $("<div class='result-wrapper'><h4>You win!</h4></div>");
    $('.board').after($results);
  },


  refreshScoreboard: function(moves, score) {
    $('.scoreboard').children().first().text("Total moves: " + moves);
    $('.scoreboard').children().eq(1).text("Score: " + score);
  }

}


var controller = {

  init: function() {
    view.init();
  },


  pickCard: function() {
    pickedCard = this;
    index = $(pickedCard).index();
    model.addMove();
    view.renderCard(pickedCard);
    if (model.flippedCards === 2) {
      $('.board').off('click');
      model.checkMatch(index);
    }
    else {
      model.setCurrentlyFlipped(index);
    }
  }

}



$( document ).ready( function() {
  controller.init();
})