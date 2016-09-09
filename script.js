$(document).ready(function() {
  view.init();
})


var view = {

  boardWidth: "960px",

  init: function() {
    var dimensions = prompt("What size grid do you want?");

    for(var i = 0; i < dimensions; i++) {
      var $cardRow = $("<div></div>");
      $cardRow.addClass("row");
      $("#board").append($cardRow);

      for(var j = 0; j < dimensions; j++) {
        var $cardSpace = $("<div></div>");
        $cardSpace.attr("id", "card" + String(j) + String(i));
        $cardSpace.width(view.boardWidth/(dimensions + 1));
        $cardSpace.appendTo($cardRow);
      };

      
    };

  }

};

var model = {

};

var controller = {

};