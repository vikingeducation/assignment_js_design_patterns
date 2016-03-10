var view = {

  init: function() {
    this.askUser();
  },

  registerEventListeners: function() {
    $(".card-col").on("click", ".card", function( event ) {

      var cardID = event.target.id;
      $("#" + cardID).toggleClass("card-revealed");
      $("#" + cardID).text( model.getCard( this.getIndexFromCardID(cardID) ).content )

      model.checkRevealed( indexFromCardID(cardID), !!event.target.className.match(/card-revealed/) );
    });
  },

  revealCard: function() {

  },

  hideCard: function( id ) {
    $("#card-" + id).removeClass("card-revealed");
  },

  askUser: function() {
    this.numPairs = prompt( "How many pairs do you want to play with?", 2 );
  },

  addCard: function( id ){
    var card = $('<div class = "col-sm-3 card-col" ><div class = "card" id="card-'+ id +'"></div></div>');
    $('#cardholder').append(card);
  },

  indexFromCardID: function(cardID) {
    Number(cardID.match(/card-(.)/)[1]);
  }
}
