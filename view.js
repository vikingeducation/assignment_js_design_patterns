"use strict";

var view = {
  render: function(){
    $(".game-wrapper").append(model.pictures);
    this.addTogglePictureListener();
  },
  
  promptUser: function(){
    return Number(prompt("Enter the amount of pictures for board size. (Choose an even number between 4 - 20"));
  },
  
  addTogglePictureListener: function(){
    var choices = model.choices,
        choice1 = model.choice1,
        choice2 = model.choice2;
    
    $(".picture").click(function(event){
      $(this).toggleClass("revealed");
      model.choices.push($(this));
      
      if (model.choices.length === 2) {
        var choice1 = model.choices[0],
            choice2 = model.choices[1];
            
        if ( 
          (!(choice1.is(choice2))) && 
          (choice1.text() === choice2.text()) 
          
          ) {
          choice1.addClass("revealed");
          choice1.off();
          
          choice2.addClass("revealed");
          choice2.off();
        } else {
          choice1.removeClass("revealed");
          choice2.removeClass("revealed");

        }
        
        model.choices = [];
      }
      });
    }
};
