
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


'use strict';

//shuffle function
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Model
// create cards obj
// Suggestion: each card has a value
// Flipped card count
// Check card match
// Keep game score
//   - related to board size
// Card status (flipped)

var model = {

  totalCards: 0,

  cards: {},

  cardValue: function(card_num){
    var cardValues = [];
    //create val
    for(var i = 1; i <= this.totalCards/2; i++) {
      cardValues.push(i);
      cardValues.push(i);
    }

    //shuffle
    cardValues = shuffle(cardValues);

    //assign
    for (var key = 1; key <= this.totalCards; key++) {
      this.cards.key = cardValues.pop();
    }
  },

  flippedCardCount: 0


};

var view = {
  init: function(size){
    this.setupGameboard(size);
    $('#gameboard').click('.hidden-square', function(event){this.flipSquare(event);});
    // this.renderScore();
  },

  render: function(){
    this.renderScore();
    // this.renderGameboard();
  },
  // show score
  renderScore: function(){

  },

  flipSquare: function(event){
    var selectedCard = event.target
    selectedCard.addClass("revealed-square");
    selectedCard.removeClass("hidden-square");
  },

  // renderGameboard: function(){
  //   //display flip squares
  //   // $(".revealed-square")
  // },

  // show gameboard
  setupGameboard: function(size){
    console.log(size);
    for( var i=1; i <= size; i++){
      var $card = $('<div class="hidden-square"></div>').text(model.cardValue(i));
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

  flipCard: function(){
    model.flipCard();
    view.flipCard();
    view.render();
  },

  boardsize: function(){
    var userBoardSize = prompt('What is the size of the board?');
    userBoardSize = Math.floor(userBoardSize);
    if (userBoardSize %2 !== 0 && userBoardSize !== 0){
      userBoardSize +=1;
    }else {
      userBoardSize = 10;
    }
    return userBoardSize;
  }

};



$(document).ready(function(){
  controller.init();
});