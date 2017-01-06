var model = {

  init: function(numPairs) {
    for (var i = 1; i <= numPairs; i++) {
      this.createPair();  
    }
  },

  createPair: function() {
    Card
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

  Card: function(imagePath) {

    this.imagePath = imagePath;
    this.flipped = false;

  },

  cards: [

    0: {
      imagePath: ?,
      flipped: ?,
      found: ?,
      pair: ?
    },

    1: {

    }
  ]

  board: [7,2,8,1,3,5,4]

};
