
memoryView = {

  createImgDiv: function(gameCard) {
    $('body').append($('<div></div>')
             .html(this.createImgTag(gameCard)));
  },

  createImgTag: function(path) {
    var imgTag = $('<img>');
    var fullPath = 'PNG-cards-1.3/' + path;
    imgTag.attr('src', fullPath);
    return imgTag;
  },

  renderGrid: function(gameCards) {
    for (var i = 0; i < gameCards.length; i++) {
      this.createImgDiv(gameCards[i]);
    }
  }

};

memoryModel = {
  gameCards: [],
  cardNums: ['2','3','4','5','6','7','8','9','10','ace','jack','queen','king'],
  cardSuits: ['spades', 'hearts', 'diamonds', 'clubs'],
  randNum: function(num) { return Math.floor(Math.random() * num); },
  randCardPath: function() {
    return this.cardNums[this.randNum(13)] + '_of_' + this.cardSuits[this.randNum(4)] + '.png';
  },
  createCards: function(numCards) {
    var that = this;
    for(var i = 0; i < numCards; i++) {
      var cardPath = that.randCardPath();
      that.gameCards.push(cardPath)
      that.gameCards.push(cardPath)
    }
    return this.gameCards;
  }
};

var memoryController = {

  init: function() {
    this.model = memoryModel;
    this.view = memoryView;
    this.setupGrid();
  },

  setupGrid: function() {
    var gridSize = prompt('How many pairs to play with? (even)');
    var gameCards = this.model.createCards(gridSize);
    console.log(gameCards);
    this.view.renderGrid(gameCards);

  },

};

$(document).ready(function() {
  memoryController.init();
});
