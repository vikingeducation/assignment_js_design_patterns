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
  },

};

$(document).ready(function(){
  controller.init();
});
