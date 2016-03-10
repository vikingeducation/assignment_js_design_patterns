var controller = {
  init: function(){
      // Initialize random pairs
      model.generatePairs(2);
      view.init();
    },


  getPairs: function(){
    return model.getPairs();
  },

  showCard: function(cardId) {
    model.getPairs()[cardId].visible = true;
    view.render();
  },

  hideCard: function(cardId) {
    model.getPairs()[cardId].visible = false;
    view.render();
  }

};

$(document).ready(function(){
  controller.init();
} );
