var controller = {

  init: function() {
    view.setUpListener(controller.createPairs, controller.render);
  },

  createPairs: function(numPairs) {
    model.init(numPairs);
  },

  render: function() {
    view.renderBoard(model.cards);
  }
    // {
    // var numberOfCardPairs = function() {
    //
    // };
    //
    // for (var i = 0; i < numberOfCardPairs; i++) {
    //   var $card = Card();
    //   $card.appendTo('#cards');
    //   $card.clone().appendTo('#cards');
    // }


};

$(document).ready(function(){
  controller.init();
});
