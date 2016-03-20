var controller = {

  init: function() {
    view.init();
    model.init();
    model.populateCards( view.numPairs );
    view.registerEventListeners();
  },

  hideCard: function( ids ) {

  }

}

$( document ).ready( function() {
  controller.init();
});
