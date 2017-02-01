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
      
      model.choices.push($(this));
      $(this).toggleClass("revealed");
      
      if (!!choice1) {
        model.choice2 = $(this);
        
        if ( (!(choice1.is(choice2))) && (choice1.text() === choice2.text()) ) {
          choice1.addClass("matched");
          choice2.addClass("matched");
        } else {
          choice1.removeClass("revealed");
          choice2.removeClass("revealed");
          
          model.choices = [];
          model.choice1 = null;
          model.choice2 = null;
        }
      } else {
        model.choice1 = $(this);
      }
      
        console.log("~~~~~~~~");
        console.log("model.choice1 " + model.choice1);
        console.log("model.choice2 " + model.choice2);
        console.log("model.choices " + model.choices);
        console.log("~~~~~~~~");
        
        
      });
    }
};
