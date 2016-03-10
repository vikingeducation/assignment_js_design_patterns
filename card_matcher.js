function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

var model = {

    gridSize: 2,
    cardList: [],

    validateGridSize: function(gridSize) {
      if ((gridSize % 2 !== 0) || (gridSize > 8)) {
        return false;
      }
      this.gridSize = gridSize;
      return true;
    },

    getgridSize: function(){
        return this.gridSize;
    },

    generateCards: function() {
      for (var i=0; i < (Math.pow(this.gridSize, 2) / 2); i++) {
        var card = {
          flipped: false,
          value: 'foo' + i,
        };

        this.cardList.push(card);
        this.cardList.push(card);
      };
      shuffle(this.cardList);
    },

    getGenerateCards: function() {
      return this.cardList;
    },

    getCardValue: function(ourCard) {
      return ourCard.value;
    },

    getCardState: function(ourCard) {
      return ourCard.flipped;
    },
};

var controller = {

    init: function(){
        view.init();
        model.generateCards();
        view.render();
        view.clickCard();
        //model.checkPreviousCard();
    },

};

var view = {

    init: function(){

       do {
         var gridSize = prompt("Enter the grid_size (between 2 - 8) :" );
       } while(!(model.validateGridSize(gridSize)));

    },

    render: function(){
      var cardList = model.getGenerateCards();

      for(i=0; i < cardList.length; i++) {
        var currentCard = model.cardList[i];
        console.log("In Display Current Card: " + currentCard);
        var newCard = '<div class="card" data-card-value=' + String(model.getCardValue(currentCard)) + '>Card</div>'
        $('.card-field').append(newCard)
      }

    },

    clickCard: function() {
      $('.card').click(function(eventObj) {
        var state = model.getCardState(eventObj.target);

        if (!state) {
          $target = $(eventObj.target);
          var val = $target.attr( "data-card-value");

          $target.text(val);

          console.log("Flipped Card value is " + val);
        }

      })
    },

};

$(document).ready(function() {

  controller.init();

 }); 