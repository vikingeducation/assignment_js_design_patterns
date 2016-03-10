var controller = {
  init: function(){
      // Initialize random pairs
      model.generatePairs(2);
      view.init();
    },


  getPairs: function(){
    return model.getPairs();
  }



};

$(document).ready(function(){
  controller.init();
} );