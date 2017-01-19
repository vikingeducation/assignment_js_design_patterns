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


$(document).on('click', '.clickable', function() {
  if (model.checkBoard(event)) {
    view.flipCard(event);
  }
  if (model.checkMatch()) {
    model.addPoints();
    view.markMatch(event);
    model.checkForWin();
  } else if ($('.hold-card').length === 2) {
    model.reducePoints();
    view.coverMismatch();
  }
});

$('#restart').on('click', function() {
  model.restart();
  view.initialize();
  controller.initialize();
});
