var Grid = {
  minSize: 2,
  maxSize: 24,

  defaults: {
    size: 2,
    cards: []
  }
};

BaseModel.register(Grid);

Grid.addCallback('after', 'create', 'createCards', function(grid) {
  for (var i = 0; i < grid.size; i++) {
    var cardParams = {
      file: Card.filePath(Grid.maxSize - i)
    };

    var cardA = Card.create(cardParams);
    var cardB = Card.create(cardParams);
    cardA.match = cardB;
    cardB.match = cardA;

    grid.cards.push(cardA);
    grid.cards.push(cardB);
  }
  grid.cards = grid.cards.sort(function(a, b) {
    return 0.5 - Math.random();
  });
});

