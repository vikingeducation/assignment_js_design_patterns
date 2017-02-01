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
    var choices = [],
        choice1,
        choice2;
    
    $(".picture").click(function(event){
      
      choices.push($(this));
      
      if (choices.length === 2) {
        choice1 = choices[0];
        choice2 = choices[1];
        
        
        if (!(choice1.is(choice2)) && (choice1.text() === choice2.text())) {
          choice1.addClass("matched");
          choice2.addClass("matched");
        }
        
        
        choices = [];
      }
      
      
      
      // if (!($(this).immutable)) {
      //   $(this).toggleClass("revealed");
      // }
      $(this).toggleClass("revealed");
    });
  }
};
