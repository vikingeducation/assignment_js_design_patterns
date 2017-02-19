var controller = {
  init: function() {
    // get cards and render initial view
    var gridSize = model.getGridParams();
    var cards = model.generateCards(gridSize/2);
    controller.render(gridSize, cards);

    // initialize view with callbacks
    view.init({
      attemptMatch: this.attemptMatch
    });
  },

  attemptMatch: function(cardValue) {
    model.evaluateMatch(cardValue);
    var result = model.getResult();
    view.registerMove(result, cardValue);
    controller.render();
  },

  render: function(gridSize, cards) {
    var attempts = model.getAttempts();
    var matches = model.getMatches();
    var score = model.getScore();
    view.render(gridSize, cards, attempts, matches, score);
  }
};



$( document ).ready( function() {
  controller.init();
});