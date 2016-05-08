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
        .attr('class', 'card hidden');

      $('#board').append($card);
    });
  },

  showCard: function($target){
    var actualCard = model.deck[$target.data('id')].card;

    $target
      .attr('src', 'major_arcana/' + actualCard + '.jpg')
      .addClass('in-play');
  },

  hideCards: function(){
    $('.in-play')
      .delay(2000)
      .removeClass('in-play')
      .attr('src', "major_arcana/back.jpeg");
  }
};