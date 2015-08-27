// Model
// Check card match
// Keep game score
//   - related to board size
// Card status (flipped)
// Flipped card count

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
    var card = $('<div class = "hidden-square"></div>');
    for( var i=0; i <= size; i++){
      console.log(i);
      $('#gameboard').append(card);
    }
  }
};

var controller = {
  init: function(){
    var boardsize = this.boardsize();
    view.init(boardsize);
  },


  boardsize: function(){
    return prompt('What is the size of the board?');
  }

};



$(document).ready(function(){
  controller.init();
});