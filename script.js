$(document).ready(function() {
  controller.init();
})

var view = {

  boardWidth: 960,

  init: function(dimensions) {
    this.renderSquares(dimensions);
    this.setEventListeners();
  },

  renderSquares: function() {
    $("#board").empty();
    for (var i = 0; i < board.dimensions; i++) {
      var $cardRow = $("<div></div>");
      $cardRow.addClass("row");
      $("#board").append($cardRow);

      for (var j = 0; j < board.dimensions; j++) {
        var $cardSpace = $("<div></div>");
        var sizing = (view.boardWidth / (parseInt(board.dimensions) + 1));
        var coordinates = String(j) + String(i);
        $cardSpace.addClass("card");
        $cardSpace.attr("id", coordinates);
        $cardSpace.width(sizing).height(sizing);
        $cardSpace.appendTo($cardRow);
        this.flipSquare(coordinates);
      };
    };
  },

  setEventListeners: function() {

    $('#board').on('click', '.card', function() {
      controller.flipSquare($(this).attr("id"));
      controller.clickCount++;
    });
  },

  flipSquare: function(coordinates) {
    $square = $("#" + coordinates);
    var properties = controller.squareStatus(coordinates);
    if (properties.squareFlipped) {
      $square.css('background-image', 'url(images/' + properties.squareID + '.png)');
    } else {
      $square.css('background-image', "url(images/exit.png)");
    }
  }

};


function Square(id) {
  this.id = id;
  this.flipped = false;
};


var model = {

  score: 0,
  attempts: 0,
  squares: {},

  createSquares: function() {
    var counter = 0;
    for (var i = 0; i < (board.dimensions**2)/2; i++) {
      var squareCoordsFirst = this.setXY();
      var squareCoordsSecond = this.setXY();
      this.squares[squareCoordsFirst] = new Square(counter);
      this.squares[squareCoordsSecond] = new Square(counter);
      counter++;
    }
  },

  setXY: function() {
    var result;
    var count = 0;
    for (var coordinatePair in board.spaces) {
      if (Math.random() < 1 / ++count) {
        result = coordinatePair;
      }
    };
    delete board.spaces[result];
    return result;
  },

  flipSquare: function(coordinates) {
    var square = this.findSquare(coordinates);
    square.flipped = square.flipped ? false : true;
  },

  findSquare: function(coordinates) {
    return this.squares[coordinates];
  }

};

var board = {

  spaces: {},

  init: function() {
    for (var i = 0; i < board.dimensions; i++) {
      for (var j = 0; j < board.dimensions; j++) {
        this.spaces[String(i) + String(j)] = true;
      }
    }
  }
}

var controller = {

  pairHolder: [],
  coordHolder: [],

  init: function() {
    var dimensions = prompt("What size grid do you want?");

    board.dimensions = dimensions;
    board.init();
    model.createSquares(dimensions);
    view.init(dimensions);
  },

  flipSquare: function(coordinates) {
    var properties = this.squareStatus(coordinates);
    if (!properties.squareFlipped){
      this.pairHolder.push(properties.squareID);
      this.coordHolder.push(coordinates);
      model.flipSquare(coordinates);
    }
    view.renderSquares();
    this.checkPair(coordinates);
  },

  checkPair: function() {
    if (this.pairHolder.length > 2) {
      this.pairHolder = [];
      this.coordHolder = [];
    } else if (this.pairHolder.length === 2) {
      if (this.pairHolder[0] === this.pairHolder[1]) {
        console.log('you win!');
      } else {
        model.flipSquare(this.coordHolder[0]);
        model.flipSquare(this.coordHolder[1]);
      }
      model.attempts++;
      this.pairHolder = [];
      this.coordHolder = [];
    }
  },

  gameOver: function() {
    var remaining = model.countRemainingCards();
    if (!remaining) {
      return true;
    }
  },

  squareStatus: function(coordinates) {
    var foundSquare = model.findSquare(coordinates);
    var squareFlipped = foundSquare.flipped;
    var squareID = foundSquare.id
    return {
      squareFlipped: squareFlipped,
      squareID: squareID
    }
  }


};
