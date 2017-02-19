var view = {

  clickable: true,

  init: function(callbacks) {
    // set listener callbacks
    var attemptMatch = callbacks.attemptMatch;

    // click listener to reveal card
    $('#handler').on('click', '.clickable', function(event) {
      if ( view.checkClickable() ) {
        $target = $(event.target)
        $target.addClass('evaluate').removeClass('clickable');
        attemptMatch($target.text());                
      }
    });
  },

  checkClickable: function() {
    return view.clickable;
  },

  makeGrid: function(gridSize, cards) {
    var rows = gridSize/2;
    
    for (var i = 0; i < (rows); i ++) {
      console.log('called');
      // working code if i need to come back to it
      $row = $('<tr>', {class: 'text-center'});
      $('<td>', {'class': 'clickable'}).appendTo($row).text(cards.shift());
      $('<td>', {'class': 'clickable'}).appendTo($row).text(cards.shift());
      $row.appendTo($('tbody'));
    }

    if (gridSize) {
      $('td').wrapInner('<span></span>');
    }
  },

  recordAttempt: function(attempts) {
    $('#attempts').text('Attempts: ' + attempts);
  },

  recordMatches: function(matches) {
    $('#matches').text('Matches: ' + matches);
  },

  recordScore: function(score) {
    $('#score').text('Score: ' + score);
  },

  registerMove: function(result, cardValue) {
    if (result === 'true') {
      $('td:contains(' + cardValue + ')').removeClass('evaluate').addClass('match');
    } else if ( result === 'in progress') {
      // in progress
    } else if (result === 'false') {
      // need to slow this down
      view.clickable = false;
      setTimeout( function() {
        view.clickable = true;
        $('.evaluate').removeClass('evaluate').addClass('clickable');
      }, 1200);
    }
  },

  // creating grid
  render: function(gridSize, cards, attempts, matches, score) {
    view.recordAttempt(attempts);
    view.recordMatches(matches);
    view.recordScore(score);
    view.makeGrid(gridSize, cards);
  }
};