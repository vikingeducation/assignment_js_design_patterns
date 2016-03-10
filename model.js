var model = {

  attempts: 0,
  pairs: [],
  matchedArray: [],
  cards: [],

  generatePairs: function(pairNum) {
    // Initializes deck
    var suits = ["clubs", "diamonds", "hearts", "spades"];
    var cardVal = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
    for (var s in suits) {
      for (var cv in cardVal) {
        this.cards.push(cardVal + "_of_" + s + ".png");
      }
    }

    // generate pairs
    for (var i = 0; i < pairNum; i++) {
      var randomIndex = Math.floor(Math.random()*52);
      this.setPairs(cards[randomIndex]);
    }

    // shuffle the pairs
    
  },

  addAttempts: function(){
    this.attempts++;
  },

  getAttempts: function(){
    return this.attempts;
  },

  setPairs: function(card){
    this.pairs.push(card);
    this.pairs.push(card);
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
    if ( this.pairs.length === this.matchedArray.length ){
      return true;
    } else {
      return false;
    }
  }

};
