"use strict";

var view = {
  init: function(callbacks) {
    var revealCard = callbacks.revealCard;
    var reset = callbacks.reset;
    $('#card-container').on('click', '.card', function(e) {
      revealCard($(this).attr('data-id'), $(this).attr('data-value'));
    });
    $('.btn').on('click', function(e) {
      e.stopImmediatePropagation();
      reset();
    });
  },

  render: function(attempts, score) {
    $('#current-score').text(score);
    $('#attempt-count').text(attempts);
  },

  flipOpenCard: function(id) {
    var $card = $('.card[data-id=' + id + ']');
    $card.text($card.attr('data-value')).addClass('face-up');
  },

  keepCardsOpen: function(value) {
    var $cards = $('.card[data-value=' + value + ']');
    $.each($cards, function(i, el) {
      var $el = $(el);
      $el.text($el.attr('data-value')).addClass('matched').removeClass('face-up');
    });
  },

  initialReveal: function(deck) {
    var $container = $('#card-container');
    for (var i = 0; i < deck.length; i++) {
      $container.append($('<div>')
        .addClass('card ')
        .attr({
          'data-value': deck[i],
          'data-id': i
        }));
    }
    this.showFaces(deck);
  },

  showFaces: function(deck) {
    var cards = $('#card-container .card')
    $.each(cards, function(i, el) {
      var $el = $(el);
      $el.text($el.attr('data-value'));
    });
    window.setTimeout(function() {
      view.hideCards(cards);
    }, deck.length * 100);
  },

  timeOutCards: function() {
    window.setTimeout(function() {
      view.hideCards($('#card-container .face-up'));
    }, 500);
  },

  hideCards: function(collection) {
    $.each(collection, function(i, el) {
      if (!$(el).hasClass('matched')) {
        $(el).text('?').removeClass('face-up');
      }
    });
  },

  prompt: function(text) {
    var cards = prompt(text);
    return cards;
  },

  gameOver: function(msg) {
    msg = msg ? msg : 'Congratulations! You\'ve completed the game';
    alert(msg);
  },
  reset: function() {
    $('#card-container').html(null);
  }
}