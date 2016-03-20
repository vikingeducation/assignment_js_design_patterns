var model = {

  cardContents: [ "blue", "red", "green", "chicken", "horse", "cheese", "burrito" ],
  revealed: false,

  init: function() {
    this.cards = {};
    this.cardOrder = [];
    this.firstCard = null;
    this.secondCard = null;
    this.clickable = true;
    this.matches = 0;
  },

  setCard: function(id, content) {
    this.cards[id] = new Card( id, content );
    var pos = Math.floor( Math.random() * this.cardOrder.length );
    this.cardOrder.splice( pos, 0, id );
  },

  getCard: function(id) {
    return this.cards[id];
  },

  compareContent: function() {
    if( this.firstCard.content === this.secondCard.content ) {
      this.matches++;
      if(this.matches === view.numPairs){
        console.log("matches run");
        $("#outcome").show();
      }
      model.firstCard = null;
      model.secondCard = null;
    } else {

      setTimeout( function() {
        view.hideCard(model.firstCard.id);
        view.hideCard(model.secondCard.id);
        model.firstCard = null;
        model.secondCard = null;
        $(".card").css("pointer-events: auto;");
      }, 1000);
    }
  },

  checkRevealed: function( id ) {
    if ( this.firstCard && !this.secondCard ) {
      this.secondCard = this.getCard(id);
      view.revealCard( this.secondCard.id );
      this.compareContent();
    } else if ( !this.firstCard && !this.secondCard ) {
      this.firstCard = this.getCard(id);
      view.revealCard( this.firstCard.id );
    }
  },

  populateCards: function( numPairs ) {
    for (var id = 0; id < 2*numPairs; id += 2 ){
      this.setCard( id, this.cardContents[Math.floor(id/2)] );
      this.setCard( id + 1, this.cardContents[Math.floor(id/2)] );
    }
    for ( var i = 0; i < this.cardOrder.length; i++ ) {
      console.log(this.cardOrder.length);
      view.addCard( this.cardOrder[i] );
    }

  }

}

function Card( id, content ) {
  this.content = content;
  this.id = id;
}


// Hash with ids as keys and cards as values
// Randomized array of ids
