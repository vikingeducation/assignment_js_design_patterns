'use strict;'

var view = {
  init: function(){
    // set listeners
    $('#submit').click(controller.beginGame);
    $('#board').click('.hidden', controller.showCard);
  },

  render: function(){
    var score = controller.getScore();
    $('#score').text(score);

    var gameOver = model.allMatched();
    if (gameOver === true) {
      $notice = $('<h3>Game Over! Refresh to play again.</h3>')
        .attr('class', 'game-over');

      $('header').append($notice);
    }
  },

  renderCards: function(){
    model.deck.forEach(function(element){
      var $card = $('<img>')
        .attr('src', "major_arcana/back.jpeg")
        .attr('data-id', element.id)
        .attr('class', 'card');

      $('#board').append($card);
    });
  },

  showCard: function($target, actualCard){
    $target
      .attr('src', 'major_arcana/' + actualCard + '.jpg');
  },

  hideCards: function(){
    $.each(controller.pair, function(i, val){
      $('img[data-id="' + val.id + '"]')
        .attr('src', "major_arcana/back.jpeg");
    });

    // Reset pair
    controller.pair = [];
  },

  setMatch: function(pair){
    $.each(pair, function(i, val){
      $('img[data-id="' + val.id + '"]')
        .addClass('matched');
    })
  }
};