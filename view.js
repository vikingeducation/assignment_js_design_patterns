'use strict';

var view = {
  render: function(){
    $('.game-wrapper').append(model.pictures);
    view.addTogglePictureListener();
    view.addScoreListeners();
  },
  
  el: {
    scoreContainer: $('.display-board'),
    gameContainer: $('.game-wrapper'),
    
    attempts: $('#attempts-value'),
    score: $('#score-value'),
  },
  
  addScoreListeners: function(){
    view.el.attempts.text(0);
    view.el.score.text(0);
    
    view.el.gameContainer.on('click', '.picture', function(){
      view.el.attempts.text(model.attempts);
    });
  },
  
  addTogglePictureListener: function(){
    var pics = $('.picture')
    
    // controller.gameOverCheck();

    pics.click(function(event){
      $(this).toggleClass('revealed');
      
      model.choices.push($(this));
      
      if (model.choices.length === 2) {
        var choice1 = model.choices[0],
            choice2 = model.choices[1];
            
        if ( 
          (!(choice1.is(choice2))) && 
          (choice1.text() === choice2.text()) 
          
          ) {
          choice1.addClass('matched');
          choice1.off();
          
          choice2.addClass('matched');
          choice2.off();
          
          model.incrementScore();
          controller.gameOverCheck();

        } else {
          setTimeout(function(){
            choice1.removeClass('revealed');
            choice2.removeClass('revealed');
          },1000);
        }
        
        model.incrementAttempts();
        model.choices = [];
      }
    });
  }
};
