var CardsController = {
  templateDirectory: 'cards',

  update: function(id) {
    var card = Card.find(id);
    Card.update(card, this.cardParams());
  },

  cardParams: function() {
    return this.filter(this.params, [
      'isFlipped',
      'isMatched'
    ]);
  }
};

ApplicationController.register(CardsController);

