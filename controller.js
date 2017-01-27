"use strict";

var controller = {
  init: function(){
    console.log("controller initiated");
    console.log(this);
    this.setGridSize();
  },

  promptGridSize: function(){
    return Number(prompt("Enter grid size. (4 - 20)"));
  },

  setGridSize: function(){
    var userInput = this.promptGridSize();
    model.setGridSize(userInput);
  }

  // setGridSize: function(){
  //   var currentSize = this.promptGridSize();
  //   console.log(currentSize)
  //   while ((currentSize % 2 !== 0) && (currentSize < 4 || currentSize > 20)) {
  //     var size = this.promptGridSize();
  //     this.setGridSize(size);
  //   }
  // }

}; // controller end
