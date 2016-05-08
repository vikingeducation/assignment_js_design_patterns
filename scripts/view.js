'use strict;'

var view = {
  init: function(){
    // set listeners

    this.render();
    this.renderCards();
  },

  render: function(){
    var score = controller.getScore();
    $('#score').text(score);

  },

  renderCards: function(){
    model.deck.forEach(element){
      var $card = var $span = $('<img src="major_arcana/back.jpeg">')
        .data('id', element.id)
        .attr('class', 'card hidden');

      $('#board').append($card);
    };
  }
};