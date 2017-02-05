'use strict';

var controller = {
  init: function(){
    this.promptGridSize();
    model.createPictureCache();
    view.render();
  },
    
  gameOverCheck: function(){
    if (model.maxScore === model.score) {
      console.log("game over")
      alert('Game Over! Refresh to replay.');
    }
  },

  promptGridSize: function(message){
    var promptText = message || 'Enter grid size. (4 - 20)',
        userResponse;
    
    while (true) {
      userResponse = Number(prompt(promptText));
      
      if ((userResponse % 2 === 0) && 
          (userResponse >= 4) && 
          (userResponse <= 20)) {
        break;
      }
    }
    model.setGridSize(userResponse);
  },

};
