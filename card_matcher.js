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
    card: {
      flipped: false,
      value: ''
    },

    validateGridSize: function(gridSize) {
      if ((gridSize % 2 !== 0) || (gridSize > 8)) {
        return false
      }
      return true
    },

    getgridSize: function(){
        return this.gridSize;
    },

    generateCards: function() {
      for (var i=0; i < (Math.pow(gridSize, 2) / 2); i++) {
        this.card.value = 'foo' + i;
        this.cardList.push(this.card);
        this.cardList.push(this.card);
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
    },

    cardFlip: function(){
      view.clickCard();
      model.checkPreviousCard();
    }
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
        console.log(currentCard);
        var newCard = '<div class="card" data-card-value=' + String(model.getCardValue(currentCard)) + '>Card</div>'
        $('.card-field').append(newCard)
      }
    },

    clickCard: function() {
      $('.card').click(function() {
        model.getCardState;
      })
    }

};

$(document).ready(function() {

  controller.init();

 }); 