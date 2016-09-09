
memoryView = {

};

memoryModel = {
  cards: [],
  cardNums: ['2','3','4','5','6','7','8','9','10','ace','jack','queen','king'],
  cardSuits: ['spades', 'hearts', 'diamonds', 'clubs'],
  randNum: function(num) { return Math.floor(Math.random() * num); },
  randCardPath: function() {
    return this.cardNums[this.randNum(13)] + '_of_' + this.cardSuits[this.randNum(4)] + '.png';
  },
  createCards: function(numCards) {
    for(var i = 0; i < numCards - 1; i++) {

    }
  }
};

var memoryController = {

  init: function() {
    var model = memoryModel;
    var view = memoryView;
    console.log(model.randCardPath());
  },

  setupGrid: function() {
    var gridSize = prompt('How many pairs to play with? (even)');
  },

};

$(document).ready(function() {
  memoryController.init();
});
