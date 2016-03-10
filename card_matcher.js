
var model = {

    gridSize: 2,

    validateGridSize: function(gridSize) {
      if ((gridSize % 2 !== 0) || (gridSize > 8)) {
        return false
      }
      return true
    }

};

var controller = {

    init: function(){
        view.init();
    },
};

var view = {

    init: function(){

       do {
         gridSize = prompt("Enter the grid_size (between 2 - 8) :" );
       } while(!(model.validateGridSize(gridSize)));

    },

};

$(document).ready(function() {

  controller.init();

 }); 