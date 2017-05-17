"use strict";

var view = {
  init: function(callbacks) {
    var revealCard = callbacks.revealCard;
    var reset = callbacks.reset;
    $('#card-container').on('click', '.card', function(e) {
      revealCard($(this).attr('data-id'), $(this).attr('data-value'));
    });
    $('#card-container').on('click', '')
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
    $card.addClass('face-up');
  },

  keepCardsOpen: function(value) {
    var $cards = $('.card[data-value=' + value + ']');
    $.each($cards, function(i, el) {
      var $el = $(el);
      $el.addClass('matched').removeClass('face-up');
    });
  },

  initialReveal: function(deck) {
    var $container = $('#card-container');
    for (var i = 0; i < deck.length; i++) {
      var $card = $('<div>')
        .addClass('card')
        .attr({
          'data-value': deck[i],
          'data-id': i
        });
      $card.append($('<img>').attr({
        src: 'images/' + deck[i] + '.gif'
      }));
      $container.append($card);
    }
    this.showFaces(deck);
  },

  showFaces: function(deck) {
    var cards = $('#card-container .card')
    $.each(cards, function(i, el) {
      var $el = $(el);
      $el.addClass('face-up')
    });
    window.setTimeout(function() {
      view.hideCards(cards);
    }, deck.length * 500);
  },

  timeOutCards: function() {
    window.setTimeout(function() {
      view.hideCards($('#card-container .face-up'));
    }, 500);
  },

  hideCards: function(collection) {
    $.each(collection, function(i, el) {
      var $el = $(el);
      if (!$el.hasClass('matched')) {
        $el.removeClass('face-up');
      }
    });
  },

  prompt: function(text) {
    var cards = prompt(text);
    return cards;
  },

  gameOver: function(msg) {
    msg = msg ? msg : 'Well done! You\'ve matched all the cats!';
    alert(msg);
  },
  reset: function() {
    $('#card-container').html(null);
  }
}