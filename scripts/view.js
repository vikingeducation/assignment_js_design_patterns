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
    model.deck.forEach(function(element){
      var $card = $('<img>')
        .attr('src', "major_arcana/back.jpeg")
        .attr('data-id', element.id)
        .attr('class', 'card hidden');

      $('#board').append($card);
    });
  }
};