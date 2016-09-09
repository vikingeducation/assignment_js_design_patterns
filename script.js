$(document).ready(function() {
  var gridSize = prompt("How big of a grid?");
  Controller.init(gridSize);
});

var View = {

  init: function(size) {
    this.grid = $('.grid')
    this.renderCards();
    this.showBack();
    this.showFront();
  },

  showFront: function() {
    $('.grid').on('click', '.card', function(e) {
      var $that = $(this);
      $that.addClass('seekingLove');
      $that.removeClass('back');
      Controller.sendCard($that.text());
    });
  },

  showBack: function() {
    $('.card').addClass('back');
  },

  renderCards: function() {
    var cards = Controller.getCards();
    while(cards[0]) {
      cards = this.render(cards);
    };
  },

  render: function(cards) {
    var rand = Math.floor(Math.random() * cards.length);
    var randCard = cards[rand];
    cards.splice(rand, 1);
    var newCard = this.buildCardDiv(randCard)
    this.grid.append(newCard);
    return cards;
  },

  buildCardDiv: function(card) {
    return $('<div class="card"></div>')
        .attr('data-id', card.value)
        .text(card.value);
  },

  yesMatch: function() {
    $('.seekingLove').removeClass('seekingLove').addClass('flipped')
  },

  noMatch: function() {
    $('.seekingLove').removeClass('seekingLove').addClass('back');
  }
};

var Controller = {
  init: function(size) {
    Model.init(size);
    View.init();
  },

  getCards: function() {
    return Model.cards;
  },

  sendCard: function(card) {
    Model.updateCard(card);
  },

  stayUp: function() {
    View.yesMatch();
  },

  flipDown: function() {
    setTimeout(View.noMatch, 1000);
  }
};

var Model = {
  init: function(size) {
    this.cards = [];
    this.buildDeck(size);
  },

  buildDeck: function(size) {
    for (var i = 1; i <= Number(size); i++) {
      this.cards.push(new Card(String(i)));
      this.cards.push(new Card(String(i)));
    }
  },

  matches: [],

  compareCards: function(matches) {
    console.log(matches);
    if (matches[0] === matches[1]) {
      Controller.stayUp();
    } else {
      Controller.flipDown();
    }
    this.matches = [];
  },

  updateCard: function(card) {
    this.matches.push(card);
    if (this.matches.length === 2) {
      this.compareCards(this.matches);
    }
  }
};

function Card (value) {
  this.value = value;
  this.flipped = false;
}
