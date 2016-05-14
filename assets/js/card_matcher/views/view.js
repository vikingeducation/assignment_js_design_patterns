var View = {
  init: function(options) {
    $('.card').remove();
    this._createCards(options.cards);
    this._setClickListeners(options.onClick);
    this.updateCards(options.cards);
    this.updateScore(options.score);
  },


  updateCards: function(cards) {
    $.each(cards, function(index, card) {
      var $card = $('.card[data-id="' + card.id + '"]');
      if (card.flipped) {
        $card.addClass('flipped');
      } else {
        $card.removeClass('flipped');
      }
      if (card.matched) {
        $card.addClass('matched');
      }
    });
  },


  updateScore: function(score) {
    $('#score').text(score);
  },




  _setClickListeners: function(onClick) {
    $('#game').off('click');
    $('#game').click('.card', function(e) {
      var $card = $(e.target);
      $card = $card.hasClass('card') ? $card : $card.parent();
      var id = $card.attr('data-id');
      onClick(id);
    });
  },

  _createCards: function(cards) {
    $.each(cards, function(index, card) {
      var $card = $('<div>')
        .addClass('card')
        .addClass('pull-left')
        .attr('data-id', card.id);
      var $img = $('<img>')
        .attr('src', '/assets/images/cards/' + card.value + '.png');
      $card.append($img);
      $('#game').append($card);
    });
  },
};



