var controller = {

  initialize: function() {
    model.generateOptions();
    view.initialize();
    $('#begin').on('click', function() {
      view.initializeBoard();
    });

  },



};

$(function() {
  controller.initialize();
});




$(document).on('click', '.card', function() {
  $('.card').css('pointerEvents', 'none'); //prevent clicking while checking
  if (model.checkBoard(event)) {
    view.flipCard(event);
  }
  if (model.checkMatch()) {
    model.addPoints();
    view.markMatch(event);
    //check for win
  } else if ($('.hold-card').length === 2) {
    model.reducePoints();
    view.coverMismatch();
  }

  $('.card').css('pointerEvents', 'auto'); //re-enable card clicking

});




// to turn off click function on a selector:
// $('selector').click(false);
