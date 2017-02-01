"use strict";

var controller = {
  init: function(){
    this.promptGridSize();
    model.createPictureCache();
    view.render();
  },

  promptGridSize: function(){
    var promptText = "Enter grid size. (4 - 20)",
        userInputSize;
    
    while (true) {
      userInputSize = Number(prompt(promptText));
      
      if ((userInputSize % 2 === 0) && 
          (userInputSize >= 4) && 
          (userInputSize <= 20)) {
        break;
      }
    }
    model.setGridSize(userInputSize);
    return userInputSize;
  },

  setGridSize: function(){
    var userInput = this.promptGridSize();
    model.setGridSize(userInput);
  }
};
