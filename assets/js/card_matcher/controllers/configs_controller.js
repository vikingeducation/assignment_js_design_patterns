var ConfigsController = {
  _promptForGridSize: function() {
    var result,
        isValid;
    do {
      result = +prompt('What size grid would you like? (2 - 12)');
      isValid = (result >= Game.MIN_CARD_NUMBER && result <= Game.MAX_CARD_NUMBER);
      if (!isValid) {
        alert('Not a valid grid size...');
      }
    } while (!isValid);
    return result;
  },


  init: function() {
    var result = this._promptForGridSize();
    // var result = 4;
    GamesController.init({ size: result });
  }
};

