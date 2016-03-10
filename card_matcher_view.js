var view = {

    revealed: false,
    card_array: [],

  init: function() {
    this.askUser();
    this.addCards();

    $(".card-col").on("click", ".card", function( event ) {
      var cardID = event.target.id;
      console.log( cardID + " clicked!" );
      $("#" + cardID).toggleClass("card-revealed");

      
    if (event.target.className.match(/card-revealed/){
      this.card_array.push(cardID);

      if(this.revealed){
        if(//compare actual elements of the array ){
          //solved!
        }
        else{
          this.revealed = false;
          setTimeout(remove_revealed,1000);
        }
      }
      else{
        this.revealed = true;
      }

    }

      //if recent click has card-revealed class
        //add to card array
        //check if revealed boolean is true
          //if element 0, element 1 card array equal?
            //if eq-win, add a class solved
            //else revealed = false on both
            //remove revealed class on both, one sec delay
          //else
            //revealed = true

        


    });
  },

  askUser: function() {
    this.numPairs = prompt( "How many pairs do you want to play with?", 2 );
  },

  addCards: function(){

    for (var i = 0; i < (this.numPairs*2); i++ ){
      var card = $('<div class = "col-sm-3 card-col" ><div class = "card" id="card-'+ i +'"></div></div>');
      $('#cardholder').append(card);
    }
  },
}
