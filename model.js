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
    var calculation = (this.successfulMatches * 5) - this.attemptedMatches;
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
