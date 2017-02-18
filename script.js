var model = {

  getGridParams: function() {
    var params = parseInt( prompt("How many cards do you want on your grid?"));
    // does not accept text or odd number inputs
    while ( isNaN(params) || params % 2 === 1 || params < 6 ) {
      params = prompt('Please pick an even number greater than 6.')
    }
    return params;
  }
};

var view = {
  init: function() {
  },

  makeGrid: function(gridSize) {
    var rows = gridSize/2;
    var cards = [];
    for (var i = 0; i < (rows + 1); i ++) {
      $row = $('<tr>', {class: 'text-center'});
      $('<td>111</td>').appendTo($row);
      $('<td>111</td>').appendTo($row);
      $row.appendTo($('tbody'));
    }
  },

  // creating grid
  render: function(gridSize) {
    view.makeGrid(gridSize);
  }
};

var controller = {
  init: function() {
    this.render();
  },

  render: function() {
    var gridSize = model.getGridParams();
    view.render(gridSize);
  }
};



$( document ).ready( function() {
  controller.init();
});
