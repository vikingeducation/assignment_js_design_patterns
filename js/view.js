var view = {

  setUpListener: function(createPairs, render) {
    $('#submit-button').on('click', function(event){
      var numPairs = $('#num-pairs').val();
      createPairs(numPairs);
      render();
    });
  },

  renderBoard: function(cards) {
    for (var i = 0; i < cards.length; i++) {
      this.$renderCard(cards[i]).appendTo('#cards');
    }
  },

  $renderCard: function(modelCard) {
    var catImagePath = 'url(img/' + modelCard.imageName + ')';
    return $("<div class='card'>").css('background-image', catImagePath);
  },

};
