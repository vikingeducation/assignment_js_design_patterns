"use strict";

var view = {
  render: function(){
    $(".game-wrapper").append(model.pictures)
    this.addTogglePictureListener();
  },
  
  promptUser: function(){
    return Number(prompt("Enter the amount of pictures for board size. (Choose an even number between 4 - 20"));
  },
  
  addTogglePictureListener: function(){
    $(".picture").click(function(event){
      $(this).toggleClass("revealed");
    });
  }
};
