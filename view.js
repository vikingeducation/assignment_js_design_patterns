var view = {
 init: function() {

  $("input").on('click', function(){
    controller.resetGame();
  } );

  $('.board').on('click', '.unmatched', function(event){
    $id = $(event.target).attr("id");
    var cards = controller.getPairs();
    var visibleCount = 0;
    var visibleCardIds = [];

    controller.showCard($id);

    for ( var c in cards ) {
      if ( cards[c].visible) {
        visibleCount++;
        visibleCardIds.push(c);
      }
    }
    if ( visibleCount >= 2 ) {
      controller.checkMatch(visibleCardIds);
      controller.addAttempt();
      setTimeout(view.hideAllCards, 500);
      setTimeout(controller.checkWin, 500);
    }
  

  });

  this.render();
 },

  render: function(){
    var cards = controller.getPairs();
    var currentCards = $(".board img").remove();

    for ( var c in cards ){

      var $imgTag = $('<img></img>');
      if ( cards[c].matched ) {
        $imgTag.css({"height": "300px", "width": "200px"});
        $imgTag.attr("class", "matched");
      } else if ( cards[c].visible ) {
        $imgTag.attr("src", "images/" + cards[c].name);
        $imgTag.attr("class", "unmatched");
      } else {
        $imgTag.attr("src", "images/" + "red_joker.png");
        $imgTag.attr("class", "unmatched");
      }
      $imgTag.attr("id", c);
      $(".board").append($imgTag);
    }

    view.showGameStats();
  },


  hideAllCards: function(){
    var cards = controller.getPairs();
    for ( var c in cards ) {
      controller.hideCard(c);
    }
  },

  showGameStats: function() {
    var attempts = controller.getAttempts();
    var totalPairs = controller.getPairs().length/2;
    var totalMatches = controller.getMatches();
    
    $(".attempts").text("Attempts: " + attempts);
    $(".pairs").text("Pairs: " + totalPairs);
    $(".matches").text("Matches: " + totalMatches);
  },

  renderWin: function() {
    $("img").remove();
    $(".win").text("You Won!");
  }
};
