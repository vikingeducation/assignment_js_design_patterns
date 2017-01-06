var view = {

  setUpInitialListener: function(createPairs, render) {
    $('#submit-button').on('click', function(event){
      var numPairs = $('#num-pairs').val();
      createPairs(numPairs);
      render();
    });
  },

  renderBoard: function(cards) {
    $('#cards').empty();
    for (var i = 0; i < cards.length; i++) {
      this.$renderCard(cards[i]).appendTo('#cards');
    }
  },

  $renderCard: function(modelCard) {
    var catImagePath = 'url(img/' + modelCard.imageName + ')';
    return $("<div class='card is-face-down'>")
      .css('background-image', catImagePath)
      .attr('id', modelCard.id);
  },

  addCardListener: function(flipCard) {
    $('#cards').on('click', '.card', function(e) {
      flipCard(e);
    });
  },

  flipCard: function(e) {
    var $card = $(e.target);
    $card.toggleClass('is-face-down');
  },

};
