var model = {

  cardContents: [ "red", "blue", "green" ],
  revealed: false,

  init: function() {
    this.cards = {};
    this.cardOrder = [];
    this.revealedCards = [];
  },

  setCard: function(id, content) {
    this.cards[id] = new Card( id, content );
    var pos = Math.floor( Math.random() * this.cardOrder.length );
    this.cardOrder.splice( pos, 0, id );
  },

  getCard: function(id) {
    return this.cards[id];
  },

  checkRevealed: function( id, cardViewRevealed ) {
    if ( cardViewRevealed ) {
      this.revealedCards.push( getCard(id) );

      if(this.revealed){
        if( this.revealedCards[0].content === this.revealedCards[1].content ) {
          //solved!
        }
        else{
          this.revealed = false;
          while ( revealedCards.length > 0 ) {
            setTimeout( view.hideCard( revealedCards.pop().id ), 1000);
          }
        }
      }
      else{
        this.revealed = true;
      }

    }
  },

  populateCards: function( numPairs ) {
    var content = "something";
    
    for (var id = 0; id < numPairs; id++ ){
      this.setCard( id, content );
    }

    for ( var i = 0; i < this.cardOrder.length; i++ ) {
      view.addCard( this.cardOrder[i] );
    }

  }

}

function Card( id, content ) {
  this.content = "test";
  this.id = id;
}


// Hash with ids as keys and cards as values
// Randomized array of ids
