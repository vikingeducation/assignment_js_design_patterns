var model = {

  score: 0,

  generateOptions: function() {
    var pairOptions = [2,3,4,5,6,7,8,9,10,11,12,13,14];
    var $selector = $('#options');
    $.each(pairOptions, function() {
      $selector.append($("<option />").val(this)
                                      .text(this)
                                    );
    });
    $selector.selectpicker({
      style: 'btn-primary',
    });
  },

  generateCards: function(pairs) {
    var cards = [];
    for (var i = 1; i <= pairs; i++) {
      cards.push(i);
      cards.push(i);
    }
    return cards;
  },

  shuffleCards: function(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
    return cards;
  },

  checkBoard: function(event) {
    var flipNextCard = false;
    var $target = event.target;
    var $holdCards = $('.hold-card');
    if ($holdCards.length < 2) {
      flipNextCard = true;
      $($target).addClass('hold-card');
    }
    return flipNextCard;
  },

  checkMatch: function(event) {
    var matched = false;
    var $holdCards = $('.hold-card');
    if ($holdCards.length === 2) {
      var $first = $holdCards.first();
      var $last = $holdCards.last();
      matched = $first.attr('data-match-number') === $last.attr('data-match-number');
    }
    return matched;
  },

  addPoints: function() {
    model.score += $('.card').length;
    view.updateScore();
  },

  reducePoints: function() {
    model.score -= 1;
    view.updateScore();
  },

  restart: function() {
    $('.win-message').remove();
    model.score = 0;
    view.updateScore();
    view.clearBoard();
  },

  checkForWin: function() {
    var faceDowns = $('.face-down').length;
    if (faceDowns === 0) {
      view.declareWin();
    }
  }

};
