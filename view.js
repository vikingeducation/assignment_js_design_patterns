var view = {
 init: function() {

  $('.board').on('click', 'img', function(event){
    $id = $(event.target).attr("id");
    controller.showCard($id);
  });

  this.render();
 },

  render: function(){
    var cards = controller.getPairs();
    var currentCards = $(".board img").remove();

    for ( var c in cards ){

      var $imgTag = $('<img></img>');
      console.log(cards[c].visible);
      if ( cards[c].visible ) {
        $imgTag.attr("src", "images/" + cards[c].name);
      } else {
        $imgTag.attr("src", "images/" + "red_joker.png");
      }
      $imgTag.attr("id", c);
      $(".board").append($imgTag);
    }
  }
};
