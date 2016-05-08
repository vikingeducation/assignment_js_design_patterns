'use strict;'

var view = {
  init: function(){
    // set listeners
    $('#board').click('.hidden', controller.showCard);

    this.render();
    this.renderCards();
  },

  render: function(){
    var score = controller.getScore();
    $('#score').text(score);

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