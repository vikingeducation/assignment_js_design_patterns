var controller = {
  init: function(){
      // Initialize random pairs
      model.generatePairs(2);
      view.init();
    },


  getPairs: function(){
    return model.getPairs();
  },

  getAttempts: function(){
    return model.getAttempts();
  },

  showCard: function(cardId) {
    model.getPairs()[cardId].visible = true;
    view.render();
  },

  hideCard: function(cardId) {
    model.getPairs()[cardId].visible = false;
    view.render();
  },

  checkMatch: function(cardIds) {
    var cards = model.getPairs();
    if (cards[cardIds[0]].name === cards[cardIds[1]].name) {
      cards[cardIds[0]].matched = true;
      cards[cardIds[1]].matched = true;
    }
  },

  getMatches: function() {
    return model.getMatches();
  },

  addAttempts: function() {
    model.addAttempts();
  }

};

$(document).ready(function(){
  controller.init();
} );
