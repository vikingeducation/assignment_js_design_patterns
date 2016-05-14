var GamesController = {
  init: function(params) {
    Game.init(params);
    View.init({
      cards: Game.cards,
      score: Game.score,
      onClick: this._onCardClick
    });
  },




  _onCardClick: function(id) {
    var action = [
      GamesController._flipFirst,
      GamesController._flipSecond
    ];
    action = action[Game.numFlippedUnmatchedCards] ||
      GamesController._rejectFlip;
    action(id);
  },


  _flipFirst: function(id) {
    if (Game.isHidden(id)) {
      Game.showCard(id);
      View.updateCards(Game.cards);
    } else {
      GamesController._rejectFlip();
    }
  },


  _flipSecond: function(id) {
    if (Game.isHidden(id)) {
      Game.showCard(id);
      GamesController._match(id);
    } else {
      GamesController._rejectFlip();
    }
  },


  _match: function(id) {
    if (Game.isMatch(id)) {
      Game.setMatch(id);
      View.updateScore(Game.score);
      setTimeout(GamesController._checkWin, 100);
    } else {
      setTimeout(function() {
        Game.hideUnmatched();
        View.updateCards(Game.cards);
      }, 2000);
    }
    View.updateCards(Game.cards);
  },


  _rejectFlip: function() {
    alert("Whoa let's not go flipping crazy there! Ok?");
  },


  _checkWin: function() {
    if (Game.didWin()) {
      alert("You won!");
      ConfigsController.init();
    }
  }
};

