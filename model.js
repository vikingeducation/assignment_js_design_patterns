var model = {

  init: function() {
    this.attempts = 0;
    this.pairs = [];
    this.matchedArray = [];
    this.cards = [];
  },

  generatePairs: function(pairNum) {
    // Initializes deck
    var suits = ["clubs", "diamonds", "hearts", "spades"];
    var cardVal = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
    for (var s in suits) {
      for (var cv in cardVal) {
        var newCard = new Card(cardVal[cv] + "_of_" + suits[s] + ".png");
        this.cards.push(newCard);
      }
    }

    // generate pairs
    for (var i = 0; i < pairNum; i++) {
      var randomIndex = Math.floor(Math.random()*52);
      this.setPairs(this.cards[randomIndex]);
    }

    // shuffle the pairs

  },

  addAttempt: function(){
    this.attempts++;
  },

  getAttempts: function(){
    return this.attempts;
  },

  setPairs: function(card){
    this.pairs.push(card);
    this.pairs.push(new Card(card.name));
  },

  getPairs: function(){
    return this.pairs;
  },

  setMatchedArray: function(card){
    this.matchedArray.push(card);
    this.matchedArray.push(card);
  },

  getMatchedArray: function(){
    return this.matchedArray;
  },

  checkWin: function(){
    if ( this.pairs.length/2 === this.getMatches() ){
      return true;
    } else {
      return false;
    }
  },

  getMatches: function(){
    var matches = 0;
    for (var m in this.pairs) {
      if (this.pairs[m].matched) {
        matches++;
      }
    }
    return Math.floor(matches/2);
  }

};

function Card(name) {
  this.visible = false;
  this.name = name;
  this.matched = false;
}
