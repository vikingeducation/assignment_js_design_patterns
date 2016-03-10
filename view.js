var view = {
 init: function() {


  $('.board').on('click', 'img', function(event){
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
      if ( visibleCount >= 2 ) {
        controller.checkMatch(visibleCardIds);
        setTimeout(function() {
          view.hideAllCards();
        }, 500);
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
