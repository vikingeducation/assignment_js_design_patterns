var memoryView = {

  init: function(callbacks){
    this.callbacks = callbacks;
  },

  renderGrid: function(gameCards) {
    $('div').remove();
    for (var i = 0; i < gameCards.length; i++) {
      this.createImgDiv(gameCards[i]);
    }
    this.cardFlipListener();
  },

  createImgDiv: function(gameCard) {
    var div = $('<div class="col-xs-3"></div>');
    if (gameCard.flipped) {
      div.html(this.createImgStr(gameCard.path));
    } else {
      div.html(this.createImgStr('red_joker.png'));
      div.children().addClass('un-flipped');
    }
    div.attr('id', gameCard.id);
    $('body').append(div);
  },

  createImgStr: function(path) {
    var fullPath = 'PNG-cards-1.3/' + path;
    var imgStr = '<img src="' + fullPath + '">';
    return imgStr;
  },

  cardFlipListener: function() {
    $('.un-flipped').click(function(e) {
      $target = $(e.target);
      var targetId = $target.parent().attr('id');
      memoryView.callbacks.flipCard(targetId);
    });
  }

};

var memoryModel = {
  gameCards: [],
  currentCompCards: [],
  cardNums: ['2','3','4','5','6','7','8','9','10','ace','jack','queen','king'],
  cardSuits: ['spades', 'hearts', 'diamonds', 'clubs'],
  randNum: function(num) { return Math.floor(Math.random() * num); },
  randCardPath: function() {
    return this.cardNums[this.randNum(13)] + '_of_' + this.cardSuits[this.randNum(4)] + '.png';
  },

  shuffle: function(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      var index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      var temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  },

  card: function(path, id) {
    this.path = path;
    this.id = id;
    this.flipped = false;
    this.matched = false;
    return this;
  },

  createCards: function(numCards) {
    numCards = parseInt(numCards);
    var that = this;
    for(var i = 0; i < numCards; i++) {
      var cardPath = that.randCardPath();
      var firstCard = new that.card(cardPath, i);
      var secondCard = new that.card(cardPath, (i + numCards));
      that.gameCards.push(firstCard);
      that.gameCards.push(secondCard);
    }
    return this.shuffle(this.gameCards);
  },

  flipCard: function(targetId) {
    var targetCard = this.findCardById(targetId);
    var delay;
    targetCard.flipped = true;
    this.currentCompCards.push(targetCard);
    if (this.currentCompCards.length === 2) {
      delay = memoryModel.compareCards();
    }
    return [this.gameCards, delay];
  },

  flipCompCards: function() {
    $.each(this.currentCompCards, function(index, element) {
      console.log(element);
      element.flipped = false;
    });
    console.log(this.gameCards);
    this.currentCompCards = [];
  },

  compareCards: function() {
    var delay = false;
    if (this.currentCompCards[0].path === this.currentCompCards[1].path) {
      console.log('match');
      $.each(this.currentCompCards, function(index, element) {
        element.matched = true;
      });
      this.currentCompCards = [];
    } else {
      console.log('nah');
      delay = true;
    }
    return delay;
  },

  findCardById: function(targetId) {
    var gameCards = this.gameCards;
    for (var i = 0; i < gameCards.length; i++) {
      if (targetId == gameCards[i].id) {
        return gameCards[i];
      }
    }
  }
};

var memoryController = {

  init: function() {
    this.model = memoryModel;
    this.view = memoryView;
    this.setupGrid();
    this.view.init({
      flipCard: memoryController.flipCard
      });
  },

  setupGrid: function() {
    var gridSize = prompt('How many pairs to play with?');
    var gameCards = this.model.createCards(gridSize);
    this.view.renderGrid(gameCards);

  },

  flipCard: function(targetId) {
    var gameCards = memoryController.model.flipCard(targetId);
    memoryController.view.renderGrid(gameCards[0]);
    console.log(gameCards[1]);
    if (gameCards[1]) {
      memoryController.delayedRender();
    }
  },

  delayedRender: function() {
    memoryController.model.flipCompCards();
    var gameCards = memoryController.model.gameCards;
    setTimeout(function() {
      memoryController.view.renderGrid(gameCards);
    }, 2000);
  }

};

$(document).ready(function() {
  memoryController.init();
});
