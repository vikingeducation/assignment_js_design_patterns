'use strict;'

var controller = {
  init: function(){
    view.init();
    this.pair = [];
  },

  beginGame: function(){
    event.preventDefault();
    var size = $('#cardCount').val();
    model.init(size);
    $('.game-options').hide();
    $('#score-box').show();
    view.render();
    view.renderCards();
  },

  showCard: function(event){
    // Show the card
    var currentCard = model.deck[$(event.target).data('id')];
    currentCard.selected = true;
    view.showCard($(event.target), currentCard.card);
    controller.pair.push(currentCard);

    if (controller.pair.length === 2) {
      // Check match
      if (controller.pair[0].card === controller.pair[1].card){
        model.setMatch(controller.pair);
        view.setMatch(controller.pair);

        // Reset pair
        controller.pair = [];

      } else {
        // Hide cards after a 2-second delay
        window.setTimeout(view.hideCards, 2000);
      }

    }

    view.render()
  },


  getScore: function(){
    return model.getCurrentScore();
  }
};

$(document).ready(function(){
    controller.init();
});