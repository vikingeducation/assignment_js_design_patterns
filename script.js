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


function Square(id) {
  this.id = id;
};


var model = {

  score: 0,


};

var controller = {

  init: function(){
    var dimensions = prompt("What size grid do you want?");
    view.init(dimensions);
    model.createSquares(dimensions);
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
