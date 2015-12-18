var PlayersController = {
  templateDirectory: 'players',

  update: function(id) {
    var player = Player.find(id);
    Player.update(player, this.playerParams());
  },

  playerParams: function() {
    return this.filter(this.params, [
      'score',
      'flips'
    ]);
  }
};

ApplicationController.register(PlayersController);

