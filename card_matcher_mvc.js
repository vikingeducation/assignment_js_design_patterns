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

//---------- MODEL -----------

var model = {

  totalCards: 0,
  cards: {},
  previousCardValue: 0,
  previousCardID: 0, //don't use
  flippedCardCount: 0,
  score: 0,

  flipCard: function(cardVal, cardID){
    this.flippedCardCount += 1;
    if (this.flippedCardCount %2 !== 0){
      this.previousCardValue = cardVal;
      this.previousCardID = cardID;
    }
  },

  setScore: function(updateValue) {
    this.score += updateValue;
  },

  // changes score based on cardMatch during gameplay
  updateScore: function(cardMatch) {
    cardMatch ? this.setScore(5) : this.setScore(-4);
  },

  checkCardMatch: function(currentCardVal){
    console.log("current: " + currentCardVal + ", prev: " + this.previousCardValue);
    var correct = (currentCardVal  === this.previousCardValue) ? true : false;
    this.updateScore(correct);
    return correct;
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

//---------- VIEW -----------

var view = {
  init: function(size){
    this.setupGameboard(size);
    $('#gameboard').click('.hidden-square',
      function(event){ view.flipCard(event); });
    this.renderScore();
  },


  render: function(){
    this.renderScore();
    // this.renderGameboard();
  },
  // show score
  renderScore: function(){
    $('#score').text(model.score);
  },

  flipCard: function(event){
    //hide if 2 unmatched cards already revealed before flipping next
    if($('.revealed-square').length === 2){
      controller.immediateClear();
      this.hideCard();
    }

    var $selectedCard = $(event.target);
    $selectedCard.addClass("revealed-square");
    $selectedCard.removeClass("hidden-square");
    var selectCardID = $selectedCard.attr('id');
    var selectCardVal = model.cards[selectCardID];
    $selectedCard.text(selectCardVal);
    controller.flipCard(selectCardVal, selectCardID);
  },

  hideCard: function(){
    var $cardsFlipped = $('.revealed-square');
    $cardsFlipped.text('');
    $cardsFlipped.addClass('hidden-square');
    $cardsFlipped.removeClass('revealed-square');
  },

  confirmedPair: function(){
    var $cardsFlipped = $('.revealed-square');
    $cardsFlipped.addClass('confirmed-pair');
    $cardsFlipped.removeClass('revealed-square');
  },

  endGame: function(){
    $('#gameboard').off();
    alert('Game Ended!');
  },

  // show gameboard
  setupGameboard: function(size){
    for( var i=1; i <= size; i++){
      var $card = $('<div class="hidden-square" id="'+i+'"></div>');
      $('#gameboard').append($card);
    }
  }
};

//---------- CONTROLLER -----------

var controller = {
  init: function(){
    var boardsize = this.boardsize();
    model.totalCards = boardsize;
    model.cardValue(boardsize);
    model.setScore(boardsize*10);
    view.init(boardsize);
  },

  immediateClear: function(){
    window.clearTimeout(controller.cardFlipBackDelay);
  },

  flipCard: function(cardVal, cardID){
    model.flipCard(cardVal, cardID);
    if (model.flippedCardCount %2 === 0) {
      var isMatch = model.checkCardMatch(cardVal);
      console.log(isMatch);
      if (isMatch){
        //view method to keep card flipped;
        view.confirmedPair();
        this.checkGameEnd();

      } else {
        //delay before hiding card
        this.cardFlipBackDelay = window.setTimeout(view.hideCard, 2000);

        // cardFlipBackDelay = setTimeout(view.hideCard, 2000);
        // clearTimeout(cardFlipBackDelay);
      }
    }
    view.render();
  },

  checkGameEnd: function(){
    var gameComplete = ($('.hidden-square').length === 0);
    if (gameComplete){
      view.endGame();
    }
  },

  boardsize: function(){
    var userBoardSize = prompt('What is the size of the board?');
    userBoardSize = Math.floor(userBoardSize);
    if (isNaN(userBoardSize) || userBoardSize === 0){
      userBoardSize = 10;
    } else if (userBoardSize % 2 !== 0){
      userBoardSize +=1;
    }
    return userBoardSize;
  }

};

$(document).ready(function(){ controller.init(); });