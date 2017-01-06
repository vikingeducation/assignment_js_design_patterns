var model = {

  init: function(numPairs) {
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

  board: [7,2,8,1,3,5,4],

};
