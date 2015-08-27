
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
  previousCardValue: 0,
  flippedCardCount: 0,
  score: 0,

  flipCard: function(cardVal){
    if (this.flippedCardCount %2 !== 0){
      this.previousCardValue = cardVal;
    }
    this.flippedCardCount += 1;
  },

  setScore: function(updateValue) {
    this.score += updateValue;
  },

  // changes score based on cardMatch during gameplay
  updateScore: function(cardMatch) {
    cardMatch ? this.setScore(5) : this.setScore(-4);
  },

  checkCardMatch: function(currentCardVal){
    if (currentCardVal  === this.previousCardValue) {
      this.updateScore(true);
      return true;
    } else {
      this.updateScore(false);
      return false;
    }
  },

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
      this.cards[key] = cardValues.pop();
      console.log(this.cards);
    }
  }

};

var view = {
  init: function(size){
    this.setupGameboard(size);
    $('#gameboard').click('.hidden-square',
      function(event){view.flipCard(event);});
    // this.renderScore();
  },

  render: function(){
    this.renderScore();
    // this.renderGameboard();
  },
  // show score
  renderScore: function(){},

  flipCard: function(event){
    var $selectedCard = $(event.target);
    $selectedCard.addClass("revealed-square");
    $selectedCard.removeClass("hidden-square");
    var selectCardVal = model.cards[$selectedCard.attr('id')];
    $selectedCard.text(selectCardVal);
    controller.flipCard(selectCardVal);
  },

  // show gameboard
  setupGameboard: function(size){
    for( var i=1; i <= size; i++){
      var $card = $('<div class="hidden-square" id="'+i+'"></div>');
      $('#gameboard').append($card);
    }
  }
};

var controller = {
  init: function(){
    var boardsize = this.boardsize();
    view.init(boardsize);
    model.totalCards = boardsize;
    model.cardValue(boardsize);
    model.setScore(boardsize*10);
  },

  flipCard: function(cardVal){
    model.flipCard(cardVal);
    if (model.flippedCardCount %2 === 0) {
      var isMatch = model.checkCardMatch(cardVal);
    }
    view.render();
  },

  boardsize: function(){
    var userBoardSize = prompt('What is the size of the board?');
    userBoardSize = Math.floor(userBoardSize);
    if (userBoardSize %2 !== 0){
      userBoardSize +=1;
    }else if(userBoardSize === 0){
      userBoardSize = 10;
    }
    return userBoardSize;
  }

};

$(document).ready(function(){ controller.init(); });