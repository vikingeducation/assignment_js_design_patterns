var model = {

  cardContents: [ "red", "blue", "green", "chicken", "horse" ],
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
      this.revealedCards.push( this.getCard(id) );

      if(this.revealed){
        if( this.revealedCards[0].content === this.revealedCards[1].content ) {
          //solved!
        }
        else{
          this.revealed = false;

            setTimeout( function() {
              while ( model.revealedCards.length > 0 ) {
                view.hideCard( model.revealedCards.pop().id );
              }
            }, 1000);
        }
      }
      else{
        this.revealed = true;
      }

    }
  },

  populateCards: function( numPairs ) {
    for (var id = 0; id < 2*numPairs; id += 2 ){
      this.setCard( id, this.cardContents[Math.floor(id/2)] );
      this.setCard( id + 1, this.cardContents[Math.floor(id/2)] );
    }
    console.log(this.cardOrder)
    for ( var i = 0; i < this.cardOrder.length; i++ ) {
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
