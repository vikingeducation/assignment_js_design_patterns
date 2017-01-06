var controller = {

  init: function() {
    view.setUpListener(controller.createPairs, controller.render);
  },

  createPairs: function(numPairs) {
    model.init(numPairs);
  },

  render: function() {
    model.shuffle(model.cards);
    view.renderBoard(model.cards);
  }

};

$(document).ready(function(){
  controller.init();
});
