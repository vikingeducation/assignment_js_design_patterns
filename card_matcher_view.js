var view = {

  init: function() {
    this.askUser();
  },

  registerEventListeners: function() {
    $(".card-col").on("click", ".card", function( event ) {

      if (model.clickable){
        var cardID = event.target.id;
        //view.revealCard( cardID );
        model.checkRevealed( view.indexFromCardID( cardID ));

        for (var i = 0; i <2; i++){
          if(model.revealedCards[i]){
            view.revealCard(model.revealedCards[i].id);
          }
          
        }

      }
      
    });
  },

  revealCard: function( id ) {
    $("#card-" + id).addClass("card-revealed");
    $("#card-" + id).text( model.getCard(id).content )
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
