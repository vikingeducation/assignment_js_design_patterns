var GamesController = {
  templateDirectory: 'games',

  show: function(id) {
    var data = {
      game: Game.find(id)
    };
    this.render('show', data);
  },

  make: function() {
    var data = {
      game: Game.make()
    };
    this.render('make', data);
  },

  create: function() {
    var grid = Grid.create(this.gameParams())
    var player = Player.create();
    var game = Game.create({
      grid: grid,
      player: player
    });
    GamesController.show(game.id);
  },

  gameParams: function() {
    return this.filter(this.params, [
      'size'
    ]);
  }
};

ApplicationController.register(GamesController);

