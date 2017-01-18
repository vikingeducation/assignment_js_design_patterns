var controller = {

  initialize: function() {
    model.generateOptions();

    $('#begin').on('click', function() {
      $('#welcome').hide('slow');
      var $pairCount = $('#options').val();
      view.renderBoard($pairCount);
    });

  },



};

$(function() {
  controller.initialize();
});



var holdCard;

$(document).on('click', '.card', function() {
  $('.card').css('pointerEvents', 'none'); //prevent clicking while checking
  if (model.checkBoard(event)) {
    view.flipCard(event);
  }
  if (model.checkMatch()) {
    view.markMatch(event);
    //check for win
  } else if ($('.hold-card').length === 2) {
    view.coverMismatch();
  }

  $('.card').css('pointerEvents', 'auto'); //re-enable card clicking

});




// to turn off click function on a selector:
// $('selector').click(false);
