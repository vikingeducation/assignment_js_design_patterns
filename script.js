var memoryView = {

  renderGrid: function(gameCards) {
    for (var i = 0; i < gameCards.length; i++) {
      this.createImgDiv(gameCards[i]);
    }
  },

  createImgDiv: function(gameCard) {
    var div = $('<div class="col-xs-3"></div>');
    div.html(this.createImgStr(gameCard.path) +
             this.createImgStr('red_joker.png'));
    div.attr('id', gameCard.id);
    $('body').append(div);
    $('img').last().addClass('joker-img');
    $('img').last().prev().hide();
  },

  createImgStr: function(path) {
    var fullPath = 'PNG-cards-1.3/' + path;
    var imgStr = '<img src="' + fullPath + '">';
    return imgStr;
  },

  // toggleCardListener: function() {
  //   $('img').click(function(e) {
  //     $target = $(e.target);
  //     $target.siblings().toggle();
  //     $target.toggle();
  //   });
  // }

};

var memoryModel = {
  gameCards: [],
  cardNums: ['2','3','4','5','6','7','8','9','10','ace','jack','queen','king'],
  cardSuits: ['spades', 'hearts', 'diamonds', 'clubs'],
  randNum: function(num) { return Math.floor(Math.random() * num); },
  randCardPath: function() {
    return this.cardNums[this.randNum(13)] + '_of_' + this.cardSuits[this.randNum(4)] + '.png';
  },

  card: function(path, id) {
    this.path = path;
    this.id = id;
    return this;
  },

  createCards: function(numCards) {
    numCards = parseInt(numCards);
    var that = this;
    for(var i = 0; i < numCards; i++) {
      var cardPath = that.randCardPath();
      var firstCard = new that.card(cardPath, i);
      console.log(firstCard);
      var secondCard = new that.card(cardPath, (i + numCards));
      that.gameCards.push(firstCard);
      that.gameCards.push(secondCard);
    }
    return this.gameCards;
  }
};

var memoryController = {

  init: function() {
    this.model = memoryModel;
    this.view = memoryView;
    this.setupGrid();
    this.view.toggleCardListener();
  },

  setupGrid: function() {
    var gridSize = prompt('How many pairs to play with?');
    var gameCards = this.model.createCards(gridSize);
    console.log(gameCards);
    this.view.renderGrid(gameCards);

  },

};

$(document).ready(function() {
  memoryController.init();
});
