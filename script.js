$(document).ready(function() {
  controller.init();
})

var view = {

  boardWidth: 960,

  init: function(dimensions) {
    this.renderSquares(dimensions);
    this.setEventListeners();
  },

  renderSquares: function(dimensions) {
    for (var i = 0; i < dimensions; i++) {
      var $cardRow = $("<div></div>");
      $cardRow.addClass("row");
      $("#board").append($cardRow);

      for (var j = 0; j < dimensions; j++) {
        var $cardSpace = $("<div></div>");
        var sizing = (view.boardWidth / (parseInt(dimensions) + 1));
        $cardSpace.addClass("card");
        $cardSpace.attr("id", "card" + String(j) + String(i));
        $cardSpace.width(sizing).height(sizing);
        $cardSpace.appendTo($cardRow);
      };
    };
  },

  setEventListeners: function() {

    $('#board').on('click', '.card', function() {
      controller.flipSquare($(this));
    });
  },

  flipSquare: function($square) {
    $square.css('background-image', 'url(images/' + '' + '.png)');
    // controller call
  }

};


function Square(id, coords) {
  this.id = id;
  this.x = coords[0];
  this.y = coords[1];
  this.flipped = false;
};


var model = {

  score: 0,

  createSquares: function() {
    for(var i = 0; i < board.dimensions; i++) {
      for(var j = 0; j < board.dimensions; j++) {
        var squareCoords = this.setXY();
        var newSquare = new Square(String(i) + String(j), squareCoords);
        delete board.spaces[squareCoords];
      }
    }
  },

  setXY: function() {
    var result;
    var count = 0;
    for (var coordinatePair in board.spaces) {
      if (Math.random() < 1/++count) {
        result = coordinatePair;
      }
    };
    return result;
  },

  flipSquare: function(square) {

  }


};

var board = {

  spaces: {},

  init: function() {
    for(var i = 0; i < board.dimensions; i++) {
      for(var j = 0; j < board.dimensions; j++) {
        this.spaces[String(i) + String(j)] = true;
      }
    }
  }
}

var controller = {

  init: function(){
    var dimensions = prompt("What size grid do you want?");

    board.dimensions = dimensions;
    board.init();

    model.createSquares(dimensions);
    view.init(dimensions);
  },

  flipSquare: function(){
    model.flipSquare();
    view.flipSquare();
  },

  gameOver: function(){
    var remaining = model.countRemainingCards();
    if (!remaining) {
      return true;
    }
  }

};
