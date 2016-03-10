var view = {

  init: function() {
    this.askUser();
  },

  registerEventListeners: function() {
    $(".card-col").on("click", ".card", function( event ) {

      var cardID = event.target.id;

      view.revealCard( cardID );

      model.checkRevealed( view.indexFromCardID( cardID ), !!event.target.className.match(/card-revealed/) );
    });
  },

  revealCard: function( cardID ) {
    $("#" + cardID).addClass("card-revealed");
    $("#" + cardID).text( model.getCard( view.indexFromCardID(cardID) ).content )
  },

  hideCard: function( id ) {
    $("#card-" + id).removeClass("card-revealed");
    $("#card-" + id).text("");
  },

  askUser: function() {
    this.numPairs = prompt( "How many pairs do you want to play with?", 2 );
  },

  addCard: function( id ){
    var card = $('<div class = "col-sm-3 card-col" ><div class = "card" id="card-'+ id +'"></div></div>');
    $('#cardholder').append(card);
  },

  indexFromCardID: function( cardID ) {
    return Number(cardID.match(/card-(.)/)[1]);
  }
}
