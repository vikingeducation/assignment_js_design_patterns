var model = {
  gridSize: 0,
}

var view = {

  gridSetup: function() {
    var gridSize = model.gridSize;
    //clone the col
    var row = $('.row');
    for(var i = 0; i < gridSize - 1; i++) {
      newCol = $('.col').last().clone();
      newCol.appendTo(row);
    }

    //Now, clone the row
    var container = $('.container');
    for(var i = 0; i < gridSize - 1; i++) {
      newRow = $('.row').last().clone();
      newRow.appendTo(container);
    }
  },

  init: function() {
    var ret = false;
    var gridSize = prompt("Please enter the grid size (Even Numbers only)");
    if (gridSize != null && gridSize % 2 == 0) {
      model.gridSize = Number(gridSize);
      ret = true;
    }

    //setup
    this.gridSetup();
    return ret;
  },



};

var controller = {
  init: function() {
    while(true) {
      if (view.init() == true) {
        break;
      }
    }
  }
}

$(document).ready(function(){
  controller.init();
});