var model = {

  numCards: 0,

  init: function(numPairs) {
    this.cards = [];
    for (var pairNumber = 0; pairNumber < numPairs; pairNumber++) {
      this.createPair(pairNumber);
    }
  },

  createPair: function(pairNumber) {
    this.cards.push(new this.Card(pairNumber));
    this.cards.push(new this.Card(pairNumber));
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
    this.id = model.numCards;
    this.pairNumber = pairNumber;
    this.imageName = model.cats[pairNumber];
    this.flipped = false;
    this.found = false;
    model.numCards++;
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
  },

  flipCard: function(id) {
    var card = model.findCardById(id);
    card.flipped = true;
  },

  findCardById: function(id) {
    return model.cards[id];
  },




};



