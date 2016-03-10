var view = {
 init: function() {


  $('.board').on('click', 'img', function(event){
    $id = $(event.target).attr("id");
    // Check for visible cards and win conditions
    var cards = controller.getPairs();
    var visibleCount = 0;
    var visibleCardIds = [];

    for ( var c in cards ) {
      if ( cards[c].visible) {
        visibleCount++;
        visibleCardIds.push(c);
      }
      if ( visibleCount >= 2 ) {
        console.log(visibleCardIds);
        controller.checkMatch(visibleCardIds);
        view.hideAllCards();
      }
    }

    // reveals the card
    controller.showCard($id);

    visibleCount = 0;
    visibleCardIds = [];

    for ( c in cards ) {
      if ( cards[c].visible) {
        visibleCount++;
        visibleCardIds.push(c);
      }
      if ( visibleCount >= 2 ) {
        console.log(visibleCardIds);
        controller.checkMatch(visibleCardIds);
        //view.hideAllCards();
      }
    }


  } );

  this.render();
 },

  render: function(){
    var cards = controller.getPairs();
    var currentCards = $(".board img").remove();

    for ( var c in cards ){

      var $imgTag = $('<img></img>');
      console.log(cards[c].visible);
      if ( cards[c].matched ) {
        $imgTag.css({"height": "300px", "width": "200px"});
      } else if ( cards[c].visible ) {
        $imgTag.attr("src", "images/" + cards[c].name);
      } else {
        $imgTag.attr("src", "images/" + "red_joker.png");
      }
      $imgTag.attr("id", c);
      $(".board").append($imgTag);
    }
  },


  hideAllCards: function(){
    var cards = controller.getPairs();
    for ( var c in cards ) {
      controller.hideCard(c);
    }
  }
};
