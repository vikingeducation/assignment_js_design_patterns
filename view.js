'use strict';

var view = {
  render: function(){
    $('.game-wrapper').append(model.pictures);
    this.addTogglePictureListener();
    this.addScoreListeners();
    
    $('#attempts-value').text(model.attempts);
    $('#score-value').text(model.score + '/' + model.gridSize);
    
    console.log(this.el)
  },
  
  el: {
    scoreContainer: $('.display-board'),
    gameContainer: $('.game-wrapper'),
    
    pictures: $('.picture'),
    
    attempts: $('#attempts-value'),
    score: $('#score-value'),
  },
  
  addScoreListeners: function(){
    this.el.gameContainer.on('click', '.picture', function(){
      $('#attempts-value').text(model.attempts);
    });
  },
  
  addTogglePictureListener: function(){

    $('.picture').click(function(event){
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
          
          model.incrementMatchCount();
          console.log(model.matchCount);
        } else {
          choice1.removeClass('revealed');
          choice2.removeClass('revealed');

        }
        model.attempts++;
        
        model.choices = [];
        // view.gameOverCheck();
      }
      
      });
    }
};
