var Card = {
  defaults: {
    file: null,
    isFlipped: false,
    isMatched: false,
    match: null
  },

  canFlip: function(id) {
    var card = this.find(id);
    return !card.isFlipped && !this.isPairFlipped();
  },

  isMiss: function(id) {
    var card = Card.find(id);
    return card.isFlipped && !card.match.isFlipped && this.isPairFlipped();
  },

  isMatch: function(id) {
    var card = Card.find(id);
    return card.isFlipped && card.match.isFlipped && this.isPairFlipped();
  },

  isPairFlipped: function() {
    return this.unmatchedFlips().length >= 2;
  },

  unmatchedFlips: function() {
    return this.where(function(card) {
      return card.isFlipped && !card.isMatched;
    });
  },

  flipped: function() {
    return this.where(function(card) {
      return card.isFlipped; 
    });
  },

  matched: function() {
    return this.where(function(card) {
      return card.isMatched;
    });
  },

  unflipped: function() {
    return this.where(function(card) {
      return !card.isFlipped;
    });
  },

  unmatched: function() {
    return this.where(function(card) {
      return !card.isMatched;
    });
  },

  filePath: function(index) {
    return '/assets/images/cards/' + index + '.png';
  }
};

BaseModel.register(Card);



