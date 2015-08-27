// Model
// Check card match
// Keep game score
//   - related to board size
// Card status (flipped)
// Flipped card count
// Suggestion: each card has a value

// View
// Listener on click
// Create cards
// Flip card
// Hide card
// Generate game / cards
// Render board

// Controller
// User prompt to generate game / cards
//   - Set game score
//   - Render board
// User clicks on card
//   - Flip card
//   - Check card match if flipped card count = 2
//   - Hide card if incorrect
//   - Update score
//   - Check game end
// Game end

// Match cards on value, create board with 2 cards of value 1...


// 'use strict';

var model = {

totalCards: "",

cards = {
  index: value;
},

cardValue: function(card_num){
  cardValues = [];
  for(var i = 1; i <= totalCards; i++) {

  }

  for (var key = 1; key <= totalCards; key++) {
    cards.key = cardValues.shift();
  }
}


};

var view = {
  init: function(size){
    this.renderGameboard(size);

    // this.renderScore();
  },

  // show score
  renderScore: function(){

  },

  // show gameboard
  renderGameboard: function(size){
    console.log(size);
    for( var i=1; i <= size; i++){
      var $card = $('<div class="hidden-square"></div>').text(model.card_value(i));
      $('#gameboard').append($card);
    }
  }
};

var controller = {
  init: function(){
    var boardsize = this.boardsize();
    view.init(boardsize);
    model.totalCards = boardsize;
  },


  boardsize: function(){
    return prompt('What is the size of the board?');
  }

};



$(document).ready(function(){
  controller.init();
});