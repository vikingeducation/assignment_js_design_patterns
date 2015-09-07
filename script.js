'use strict;'


var model = {
  totalCards: 0,
  flippedCards: 0,
  currentlyFlippedCard: null,
  matchedCards: 0,
  cards: [],
  values: [],

  init: function(numberOfCards) {
    for(var i = 0; i < numberOfCards; i++) {
      model.createCard();
    };
    model.totalCards = numberOfCards;
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
    model.currentlyFlippedCard = model.cards[index];
  },

  getCardByIndex: function(index) {
    return model.cards[index];
  },

  checkMatch: function(index) {
    var card = model.getCardByIndex(index)
    var check = model.currentlyFlippedCard
    if (card.value === check.value) {
      card.matched = true;
      check.matched = true;
      view.flagMatched(card.id, check.id);
    };
  }

}


var view = {
  init: function() {
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