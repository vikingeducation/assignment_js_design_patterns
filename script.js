var model = {
  gridSize: 0,
  images: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
  imageUrls: [],
  init: function() {
    var numUrls = model.gridSize * model.gridSize;
    for (var i = 0; i < numUrls/2; i++) {
      var randomImage = model.images[Math.floor(Math.random()* model.images.length)];
      model.imageUrls.push('images/' + randomImage + '.png');
      model.imageUrls.push('images/' + randomImage + '.png');
    }
  }

}

var view = {

  gridSetup: function() {
    var gridSize = model.gridSize;
    //init model (i.e. create cards url array)
    model.init();

    //edit the url of first div
    $('.facedown').attr('src', model.imageUrls.pop());

    //clone the col
    var row = $('.row');
    for(var i = 0; i < gridSize - 1; i++) {
      newCol = $('.col').last().clone();
      newCol.find('.facedown').attr('src', model.imageUrls.pop());
      newCol.appendTo(row);
    }

    //Now, clone the row
    var container = $('.container');
    for(var i = 0; i < gridSize - 1; i++) {
      newRow = $('.row').last().clone();
      newRow.appendTo(container);
      newRow.find('.facedown').each(function() {
        $(this).attr('src', model.imageUrls.pop());
      })
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