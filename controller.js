"use strict";

var controller = {

  init: function() {
    view.init({
      revealCard: this.revealCard,
      reset: this.reset
    });
    this.startGame();
  },

  startGame: function() {
    this.askForCardCount();
    model.generateDeck()
    this.render();
    view.initialReveal(model.getDeck());
  },

  render: function() {
    var attempts = model.getAttemptsMade();
    var score = model.getScore();
    view.render(attempts, score);
  },

  revealCard: function(id, value) {
    model.addAttempt();
    var openCard = model.getOpenCard();
    view.flipOpenCard(id);

    if ($.isEmptyObject(openCard)) {
      model.setOpenCard(value, id);

    } else {

      if (openCard[value] && openCard[value] !== id) {
        model.setOpenCard();
        view.keepCardsOpen(value);
        model.addPoints(20);
        model.addMatchedCards(value);

      } else {
        view.timeOutCards();
        model.setOpenCard();
        model.deductPoints(10);
      }
    }

    view.render(model.getAttemptsMade(), model.getScore());
    controller.checkGameOver();
  },

  checkGameOver: function() {
    if (model.allCardsMatched()) {
      setTimeout(function() {
        view.gameOver();
      }, 100);
    }
  },

  askForCardCount: function() {
    var count = model.getCardCount();
    while (isNaN(count) || count > 25 || count < 2) {
      count = parseInt(view.prompt('How many pairs of cards would you like to play with? Please enter a number between 2 and 25 inclusive.'));
    }
    model.setCardCount(count);
  },

  reset: function(e) {
    model.reset();
    view.reset();
    controller.startGame();
  }


}