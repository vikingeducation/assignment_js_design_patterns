var model = {

  attemptedMatches: 0,
  successfulMatches: 0,
  score: 0,
  firstCard: null,
  result: null,

  getResult: function() {
    return this.result;
  },

  addAttempt: function() {
    this.attemptedMatches++;
  },

  getAttempts: function() {
    return this.attemptedMatches;
  },

  addMatch: function() {
    this.successfulMatches++;
    model.resetEvaluator();
  },

  getMatches: function() {
    return this.successfulMatches;
  },

  getScore: function() {
    var calculation = (this.successfulMatches * 3) - this.attemptedMatches;
    this.score = calculation;
    return this.score;
  },

  evaluateMatch: function(cardValue) {
    if (this.firstCard) {
      model.compareValues(this.firstCard, cardValue);
    } else {
      model.addAttempt();
      this.firstCard = cardValue;
      this.result = 'in progress';
    }
  },

  compareValues: function(first, second) {
    if (first === second) {
      model.addMatch();
      this.result = 'true';
    } else {
      model.resetEvaluator();
      this.result = 'false';
    }
  },

  resetEvaluator: function() {
    this.firstCard = null;
  },

  // get size of board
  getGridParams: function() {
    var params = parseInt( prompt("How many cards do you want on your grid?"));
    // does not accept text or odd number inputs
    while ( isNaN(params) || params % 2 === 1 || params < 6 ) {
      params = prompt('Please pick an even number greater than 6.')
    }
    return params;
  },

  // generating values for memory cards
  generateCards: function(numCards) {
    var cards = [];
    for (var i = 1; i < (numCards + 1); i++) {
      cards.push(String(i), String(i));
    }
    cards = model.shuffleCards(cards);
    return cards;
  },

  // shuffle card values
  shuffleCards: function(cards) {
    var currentIndex = cards.length, tempValue, randomIndex;
    while(0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = tempValue;
    }
    return cards;
  }
};

var view = {
  init: function(callbacks) {
    // set listener callbacks
    var attemptMatch = callbacks.attemptMatch;

    // click listener to reveal card
    $('td').click( function(event) {
      $target = $(event.target)
      $target.addClass('reveal').addClass('evaluate');
      attemptMatch($target.text());
    });
  },

  makeGrid: function(gridSize, cards) {
    var rows = gridSize/2;
    for (var i = 0; i < (rows); i ++) {
      $row = $('<tr>', {class: 'text-center'});
      $('<td>').appendTo($row).text(cards.shift());
      $('<td>').appendTo($row).text(cards.shift());
      $row.appendTo($('tbody'));
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
    } else if (result === 'false') {
      // need to slow this down
      setTimeout( function() {
        $('.evaluate').removeClass('reveal').removeClass('evaluate');
      }, 1000);
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

var controller = {
  init: function() {
    // render initial view
    var gridSize = model.getGridParams();
    var cards = model.generateCards(gridSize/2);
    controller.render(gridSize, cards);

    // initialize view with callbacks
    view.init({
      attemptMatch: this.attemptMatch
    });
  },


  attemptMatch: function(cardValue) {
    model.evaluateMatch(cardValue);
    var result = model.getResult();
    view.registerMove(result, cardValue);
    controller.render();
  },

  render: function(gridSize, cards) {
    var attempts = model.getAttempts();
    var matches = model.getMatches();
    var score = model.getScore();
    view.render(gridSize, cards, attempts, matches, score);
  }
};



$( document ).ready( function() {
  controller.init();
});
