var controller = {

  init: function() {
    view.setUpInitialListener(controller.createPairs, controller.render);
    view.addCardListener(controller.flipCard);
  },

  createPairs: function(numPairs) {
    model.init(numPairs);
  },

  render: function() {
    model.shuffle(model.cards);
    view.renderBoard(model.cards);
  },

  flipCard: function(e) {
    var id = e.target.id;
    model.flipCard(id);
    view.flipCard(e);
    // view.offCardListener();
    var cards = model.findFlippedCards();
    var response = model.isMatched(cards);
    if (response === "found match") {
      cardsFound(cards); // TODO
    } else if (response === "not a match") {
      setTimeout(function() {
        // TODO
        // flip cards back over
        // re-enable event listeners
      }, 2000);
    }
  },

};

$(document).ready(function(){
  controller.init();
});
