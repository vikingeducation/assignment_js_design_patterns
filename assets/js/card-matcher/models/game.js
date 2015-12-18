var Game = {
  defaults: {
    grid: null,
    player: null
  },

  isWin: function() {
    return Card.matched().length === Card.all().length;
  }
};

BaseModel.register(Game);

