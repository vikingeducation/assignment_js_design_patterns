var view = {

  init: function() {

  },

  clearBoard: function() {
    $("#board").empty();
  },

  renderCard: function(number) {
    var card = $('<div>').addClass("card face-down")
                         .data("match_number", number);
    return card;
  },

  renderBoard: function(pairs) {
    view.clearBoard();
    var cards = model.generateCards(pairs);
    cards = model.shuffleCards(cards);
    var $board = ("#board");
    cards.forEach(function(card_number) {
      view.renderCard(card_number).appendTo($board);
    });
  }


};
