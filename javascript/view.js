var view = {

  initialize: function() {
    $scoreBoard = $('#score');
    score = model.score;
    $scoreBoard.hide();
    $('#welcome').show('slow');
  },

  updateScore: function() {
    $scoreBoard = $('h1', '.score-board');
    $('.score').remove();
    $score = $('<span class="score">' + model.score + '</span>');
    $scoreBoard.append($score);
  },

  initializeBoard: function() {
    $('#welcome').hide('slow');
    var $pairCount = $('#options').val();
    view.renderBoard($pairCount);
  },

  clearBoard: function() {
    $("#board").empty();
  },

  renderCard: function(number) {
    var card = $('<div>').addClass("card face-down clickable")
                         .attr("data-match-number", number); //removed match_number
    return card;
  },

  renderBoard: function(pairs) {
    view.clearBoard();
    var cards = model.generateCards(pairs);
    cards = model.shuffleCards(cards);
    var $board = ("#board");
    cards.forEach(function(card_number) {
      view.renderCard(card_number).appendTo($board);
    });
    $('#score').show();
  },

  flipCard: function(event) {
    var $target = $(event.target);
    var cardNumber = $target.data("match-number");
    // bellow filepath specific for rawgit hosting
    var imageUrl = "SawyerMerchant/assignment_js_design_patterns/masterimages/" + cardNumber + ".jpg";
    $target.removeClass("face-down");
    $target.css('background-size', 'cover');
    $target.css('background-image', 'url(/' + imageUrl + ')');
  },

  markMatch: function(event) {
    var $matchedCards = $('.hold-card');
    model.addPoints();
    $matchedCards.removeClass('hold-card')
                 .addClass('matched')
                 .removeClass('clickable');
  },

  coverMismatch: function() {
    var $misMatches = $('.hold-card');
    model.reducePoints();

    setTimeout(function() {
      $misMatches.removeClass('hold-card')
                 .css('background-image', 'none')
                 .addClass('face-down');
    }, 1000);
  },

  declareWin: function() {
    var $scoreBoard = $('h1', '.score-board');
    var $winMessage = $('<span class="win-message">  You Win!</span>');
    $scoreBoard.append($winMessage);
  }

};
