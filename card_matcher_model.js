var model = {

  cardContents: [ "red", "blue", "green", "chicken", "horse", "cheese", "burrito" ],
  revealed: false,

  init: function() {
    this.cards = {};
    this.cardOrder = [];
    this.revealedCards = [];
    this.clickable = true;
  },

  setCard: function(id, content) {
    this.cards[id] = new Card( id, content );
    var pos = Math.floor( Math.random() * this.cardOrder.length );
    this.cardOrder.splice( pos, 0, id );
  },

  getCard: function(id) {
    return this.cards[id];
  },

  checkRevealed: function( id ) {
    console.log(this.revealedCards);
    this.revealedCards.push( this.getCard(id) );
    console.log(this.revealedCards);

    if(this.revealed){
      this.revealed = false;
      if( this.revealedCards[0].content === this.revealedCards[1].content ) {
        console.log(this.revealedCards);

        model.revealedCards = [];
      } else {
        console.log(this.revealedCards);

        this.clickable = false;
        setTimeout( function() {
          while ( model.revealedCards.length > 0 ) {
            view.hideCard( model.revealedCards.pop().id );
          }

          model.revealedCards = [];
          model.clickable = true;
        }, 1000);
      }
    }
    else{
      this.revealed = true;
    }
  },

  populateCards: function( numPairs ) {
    for (var id = 0; id < 2*numPairs; id += 2 ){
      this.setCard( id, this.cardContents[id/2] );
      this.setCard( id + 1, this.cardContents[id/2] );
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
