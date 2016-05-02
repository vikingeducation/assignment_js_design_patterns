var controller = {
  init: function(){
    view.init();
  },

  showCard: function(){
    // model.showCard()
    // view.render()
  },

  getScore: function(){
    return model.getCurrentScore();
  }
};

$(document).ready(function(){
    controller.init();
});