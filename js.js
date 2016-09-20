controller = {
  createBoard: function() {
    model.size = parseInt(view.prompt());
    view.createBoard(model.size);
  }

};

model = {
  size: 0,
  words: ["peach", "toadstool", "mario", "star", "mushroom", "luigi", "bowser", "koopa", "goomba"],
};

view = {
  prompt: function() {
    return window.prompt("Select your board size! (2-5)","2")
  },

  createBoard: function(size) {
    for (i = 1; i <= size; i++) {
      var a = $("<div></div>");
      a.addClass("row" + i);
      for (j = 1; j <= size; j++) {
        var b = $("<div class='box'>"+j+"</div>");
        b.addClass(j)
        b.appendTo(a);
      };
      a.appendTo($("#gameboard"));
    };
  },

};


$(document).ready(function() {
  controller.createBoard();

});
