'use strict;'

var controller = {
  init: function(){
  // TODO: change to user-input game size
    model.init(4);
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