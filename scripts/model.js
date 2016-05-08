'use strict;'

var model = {

  init: function(size){
    this.currentScore = 0;
    this.buildDeck(size);
  },

  getCurrentScore: function(){
    return this.currentScore;
  },

  buildDeck: function(size){
    this.deck = [];
    var cards = this.getCards(size);

    for (var i = 0; i < size * 2; i++) {
      this.deck.push({
        id: i,
        card: cards[i],
        matched: false
      });
    }
  },

  getCards: function(size){
    var cardArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];

    cardArray = this.shuffleArray(cardArray).slice(0, size);
    cardArray = cardArray.concat(cardArray);

    return this.shuffleArray(cardArray);
  },

    /**
  * Randomize array element order in-place.
  * Using Durstenfeld shuffle algorithm.
  */
  shuffleArray: function(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
  }
};