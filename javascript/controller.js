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



$(document).on('click', '.card', model.pickCard);

// $('#board').click(function(e) {
//   if( $(e.target).hasClass('.face-down')) {
//     model.flipCard(e);
//   }
// });
