var view = {

  init: function() {
    this.askUser();
    $("#outcome").hide();
  },

  registerEventListeners: function() {
    $(".card-col").on("click", ".card", function( event ) {
      $(".card").css("pointer-events: none;");
      model.checkRevealed( view.indexFromCardID( event.target.id ) );
    });

    $("button").on("click", function(event){
      location.reload();
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
    return Number(cardID.match(/card-(\d+)/)[1]);
  }
}
