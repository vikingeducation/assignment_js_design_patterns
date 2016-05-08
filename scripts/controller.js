'use strict;'

var controller = {
  init: function(){
  // TODO: change to user-input game size
    model.init(4);
    view.init();
    this.firstCard = null;
  },

  showCard: function(event){
    // Show the card
    view.showCard($(event.target));

    if (controller.firstCard === null) {
      // If this is the first card flipped
      console.log('first flipped');
      controller.firstCard = $(event.target).attr('src');
    } else {
      // If this is the second card flipped
      console.log('second flipped');
      // Check match
      var secondCard = $(event.target).attr('src');

      if (controller.firstCard === secondCard){
        console.log('match!');
        model.currentScore += 5;
        $('.in-play')
            .removeClass('hidden')
            .removeClass('in-play');
            // add class for green
            // modify model
      } else {
        // Hide cards after a 2-second delay
        window.setTimeout(view.hideCards, 2000);

        // TODO: prevent clicks during delay
      }

      // Reset first card
      controller.firstCard = null;
    }

    // model.showCard()
    view.render()
  },


  getScore: function(){
    return model.getCurrentScore();
  }
};

$(document).ready(function(){
    controller.init();
});