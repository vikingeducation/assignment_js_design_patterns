var model = {

  init: function(numPairs) {
    this.cards = [];
    for (var pairNumber = 0; pairNumber < numPairs; pairNumber++) {
      this.createPair(pairNumber);
    }
  },

  createPair: function(pairNumber) {
    var card = new this.Card(pairNumber);
    this.cards.push(card);
    this.cards.push(card);
  },

  cats: [
    '1.jpg',
    '2.jpg',
    '3.png',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
    '13.jpg',
    '14.png',
    '15.jpg',
    '16.jpg'
  ],

  Card: function(pairNumber) {
    this.pairNumber = pairNumber;
    this.imageName = model.cats[pairNumber];
    this.flipped = false;
    this.found = false;
  },

  cards: [],

  shuffle: function(array) {
    var i = 0, j = 0, temp = null;
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

};
