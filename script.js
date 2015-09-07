'use strict;'


var model = {
  totalCards: 0,
  flippedCards: 0,
  currentlyFlippedCardIndex: null,
  matchedCards: 0,
  cards: [],
  values: [],

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
      view.flagMatched(index, model.currentlyFlippedCardIndex);
      model.checkWin();
    };
  },

  checkWin: function() {
    if (model.totalCards === model.matchedCards) {
      view.renderGameOver();
    };
  }

}


var view = {
  init: function() {
    // prevent odd numbers
    model.init(prompt('Enter the total number of cards:'));

    $('.board').on('click', '.facedown', controller.pickCard);

    view.renderView();
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

  hideAllCards: function() {
    $('.card').addClass('facedown').text("#");
    model.flippedCards = 0;
    $('.board').on('click', '.facedown', controller.pickCard);
  },

  flagMatched: function(index1, index2) {
    $('.board').children().eq(index1).removeClass('card').addClass('matched');
    $('.board').children().eq(index2).removeClass('card').addClass('matched');
  },

  renderGameOver: function() {
    var $results = $("<div class='result-wrapper'><h4>You win!</h4><p>Stats go here</p></div>");
    $('.board').after($results);
  }

}


var controller = {
  init: function() {
    view.init();
  },

  pickCard: function() {
    pickedCard = this;
    index = $(pickedCard).index();
    view.renderCard(pickedCard);
    if (model.flippedCards === 2) {
      model.checkMatch(index);
      $('.board').off('click');
      //don't delay if matched
      setTimeout(view.hideAllCards, 2000);
    }
    else {
      model.setCurrentlyFlipped(index);
    }
  }
}



$( document ).ready( function() {
  controller.init();
})