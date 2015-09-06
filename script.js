'use strict;'


var model = {
  totalCards: 0,
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

  getCard: function() {

  }
}


var view = {
  init: function() {
    model.init(prompt('Enter the total number of cards:'));
    view.renderView();
  },

  renderView: function() {
    $(model.cards).each(function(index, cardObject) { view.renderCard(cardObject) } );
  },

  renderCard: function(cardObject) {
    $card = $(cardObject)
    var $newCard = $("<div class='card'>" + cardObject.value + "</div>");
    $('.board').append($newCard);
  }

}


var controller = {
  init: function() {
    view.init();
  }
}



$( document ).ready( function() {
  controller.init();
})