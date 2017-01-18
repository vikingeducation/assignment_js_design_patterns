var view = {

  init: function() {
    var score = 42;
  },

  clearBoard: function() {
    $("#board").empty();
  },

  renderCard: function(number) {
    var card = $('<div>').addClass("card face-down")
                         .attr("data-match-number", number); //removed match_number
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
  },

  flipCard: function(event) {
    var $target = $(event.target);
    var cardNumber = $target.data("match-number");
    var imageUrl = "images/" + cardNumber + ".jpg";
    $target.removeClass("face-down");
    $target.css('background-size', 'cover');
    $target.css('background-image', 'url(/' + imageUrl + ')');
  },

  markMatch: function(event) {
    var $matchedCards = $('.hold-card');
    $matchedCards.removeClass('hold-card')
                 .addClass('matched');
  },

  coverMismatch: function() {
    var $misMatches = $('.hold-card');

    setTimeout(function() {
      $misMatches.removeClass('hold-card')
                 .css('background-image', 'none')
                 .addClass('face-down');
    }, 1000);
  }


};
