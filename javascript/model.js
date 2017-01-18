var model = {

  // why can I not save a variable here like:
  // var whatever = [];

  generateOptions: function() {
    var pairOptions = [2,3,4,5,6,7,8,9,10,11,12,13,14];
    var $selector = $('#options');
    $.each(pairOptions, function() {
      $selector.append($("<option />").val(this)
                                      .text(this)
                                    );
    });
  },

  generateCards: function(pairs) {
    var cards = [];
    for (var i = 1; i <= pairs; i++) {
      cards.push(i);
      cards.push(i);
    }
    return cards;
  },

  shuffleCards: function(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
    return cards;
  },

  checkBoard: function(event) {
    
    // check if < 2 cards are in play
    // flipCard
  },

  flipCard: function(event) {
    var $target = $(event.target);
    var cardNumber = $target.data("match_number");
    var imageUrl = "images/" + cardNumber + ".jpg";
    $target.removeClass("face-down");
    $target.css('background-size', 'cover');
    $target.css('background-image', 'url(/' + imageUrl + ')');
  }

  // check for matches
  // check for game over

};
