var view = {
 init: function() {



  // $('.board').on('click', 'img', function(event){
  //   $(event.target)
  // } );


  this.render();
 },

  render: function(){
    var cards = controller.getPairs();

    for ( var c in cards ){

      var $imgTag = $('<img></img>');

      if ( cards[c].visible ) {
        $imgTag.attr("src", "images/" + cards[c].name);
      } else {
        $imgTag.attr("src", "images/" + "red_joker.png")
      }

      $(".board").append($imgTag);
    }
  }
};
