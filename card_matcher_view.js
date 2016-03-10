var view = {

  init: function() {
    this.askUser();
    this.addCards();
  },

  askUser: function() {
    this.numPairs = prompt( "How many pairs do you want to play with?", 2 );
  },

  addCards: function(){

    for (var i = 0; i < (this.numPairs*2); i++ ){
      var card = $('<div class = "col-sm-3 card-col" ><div class = "card card-'+ i +'"></div></div>');
      $('#cardholder').append(card);
    }
  },


}
