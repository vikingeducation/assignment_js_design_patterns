$MGP.Model = {
  cardImages: [
    "http://vignette1.wikia.nocookie.net/clubpenguin/images/5/59/Cheese_Pin.png/revision/latest?cb=20121229072939",
    "http://dbclipart.com/wp-content/uploads/2016/05/Clipart-chocolate-clipart-cliparts-for-you.png"
  ],
  gameboard: [],
  chooseCards: function(num) {
    var selections = [];
    var shuffled = this.shuffle(this.cardImages);
    for( var i = 0; i < num; i++ ) {
      selections.push(new MemoryGame.Card(i, shuffled[i]));
      selections.push(new MemoryGame.Card(i, shuffled[i]));
    }
    return this.shuffle(selections);
  },
  createPairs: function(cards) {
    var deck = [];

    for(prop in selections) {
      deck.push(selections[prop]);
      deck.push(selections[prop]);
    }

    return deck;
  },
  shuffle: function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  },
  randomIndex: function(length) {
    return Math.floor(Math.random() * length);
  },
  flipCard: function(index) {

    if (this.cardFlipped) {
      return this.checkMatch(this.gameboard[index]);
    } else {
      this.cardFlipped = this.gameboard[index];
      return true;
    }
  },
  checkMatch: function(card) {
    if (this.cardFlipped.value === card.value) {
      this.cardFlipped.flipped = true;
      card.flipped = true;
      this.cardFlipped = false;
      return true;
    } else {
      this.cardFlipped = false;
      return false;
    }
  },
  init: function(num){
    this.gameboard = this.chooseCards(num || 2);
    this.cardFlipped = false;
  }

}
