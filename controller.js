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
    console.log(cardId);
    console.log(model.getPairs(), model.getPairs()[cardId]);
    view.render();
  }

};

$(document).ready(function(){
  controller.init();
} );
