"use strict";

var view = {
  // init: function(callbacks) {

  // },

  // render: function(){

  // },
  
  
  
  
  
  // prompt user for grid size
  promptUser: function(){
    return Number(prompt("Enter the amount of pictures for board size. (Choose an even number between 4 - 20"));
  },
  
  container: $(".game-wrapper"),

  createPictures: function(pictureQuantity){
    var newPicture,
    i = pictureQuantity / 2;
    
    for (i; i > 0; i--) {
      newPicture = $("<div>", {class: "picture"});
      // this.container.append()
      console.log(i)
      console.log(newPicture)
      this.container.append(newPicture)
    }
  }

}; //view end
