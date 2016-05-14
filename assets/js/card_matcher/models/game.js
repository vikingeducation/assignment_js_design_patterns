var Game = {
  MIN_CARD_NUMBER: 2,
  MAX_CARD_NUMBER: 12,
  defaultNumCards: 4,
  cards: [],
  numFlippedUnmatchedCards: 0,
  score: 0,

  init: function(options) {
    options = options || {};
    var numCards = options.size * 2;
    this._createCards(numCards);
  },


  showCard: function(id) {
    var card = this.find(id);
    if (!card.flipped) {
      card.flipped = true;
      this.numFlippedUnmatchedCards++;
    }
  },


  hideCard: function(id) {
    var card = this.find(id);
    if (card.flipped) {
      card.flipped = false;
      this.numFlippedUnmatchedCards--;
    }
  },


  hideUnmatched: function() {
    var that = this;
    $.each(this.cards, function(index, card) {
      if (!card.matched) {
        that.hideCard(card.id);
      }
    });
  },


  isShown: function(id) {
    var card = this.find(id);
    return card.flipped;
  },


  isHidden: function(id) {
    var card = this.find(id);
    return !card.flipped;
  },


  getFlippedUnmatchedCard: function(id) {
    var pair = this.find(id);
    var card;
    for (var i = 0; i < this.cards.length; i++) {
      var current = this.cards[i];
      if (current.flipped && !current.matched && current.id !== pair.id) {
        card = current;
        break;
      }
    }
    return card;
  },


  isMatch: function(id) {
    var card = this.find(id);
    var flippedUnmatched = this.getFlippedUnmatchedCard(id);
    return card.value === flippedUnmatched.value;
  },


  setMatch: function(id) {
    var unmatched = this.getFlippedUnmatchedCard(id);
    var ids = [id, unmatched.id];
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var card = this.find(id);
      card.matched = true;
      this.score++;
      this.numFlippedUnmatchedCards--;
    }
  },


  find: function(id) {
    id = +id;
    var card;
    for (var i = 0; i < this.cards.length; i++) {
      var current = this.cards[i];
      if (current.id === id) {
        card = current;
        break;
      }
    }
    return current;
  },


  didWin: function() {
    return this.cards.reduce(function(prev, current) {
      prev = typeof prev === 'boolean' ? prev : prev.matched;
      current = typeof current === 'boolean' ? current : current.matched;
      return prev && current;
    });
  },




  _createCards: function(numCards) {
    this._cleanUp();
    numCards = numCards || this.defaultNumCards;
    for (var i = 0; i < numCards; i++) {
      var value = Math.ceil((i + 1) / 2);
      var card = {
        value: value,
        id: i + 1,
        flipped: false,
        matched: false
      };
      this.cards.push(card);
    }
    this.cards = this.cards.sort(function() { return 0.5 - Math.random(); });
  },


  _cleanUp: function() {
    this.cards = [];
    this.numFlippedUnmatchedCards = 0;
    this.score = 0;
  }
};




