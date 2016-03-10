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
    previousCard: undefined,
    previousID: undefined,
    currentScore: 0,

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
        var Card = function(){
          this.flipped = false;
          this.value = 'foo' + i;
        };

        this.cardList.push(new Card());
        this.cardList.push(new Card());
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

    changeState: function(ourCard) {
      ourCard.flipped = !ourCard.flipped;
    }
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
        var newCard = '<div class="card" id="' + i + '" data-card-value=' + String(model.getCardValue(currentCard)) + '>Card</div>';
        $('.card-field').append(newCard);
        $('#current-score').text(model.currentScore);
      }

    },

    clickCard: function() {
      $('.card').click(function(eventObj) {
        var index = Number($(eventObj.target).attr('id'));
        var currentCard = model.getGenerateCards()[index];
        var state = model.getCardState(currentCard);

        if (!state) {
          $target = $(eventObj.target);
          var val = $target.attr( "data-card-value");

          $target.text(val);
          model.changeState(currentCard);

          if (!model.previousCard) {
            model.previousCard = currentCard;
            model.previousID = index;
          } else {
            var previousValue = model.previousCard.value;
            var currentValue = currentCard.value;
            if (currentValue === previousValue) {
              alert('Congratulations!');
              model.currentScore++;
              model.previousCard = undefined;
              $('#current-score').text(model.currentScore);
            } else {
              alert('Try again');
              model.currentScore--;
              $('#current-score').text(model.currentScore);
              model.changeState(model.previousCard);
              model.changeState(currentCard);

              $('#' + model.previousID).text('Card');
              $target.text('Card');
              model.previousCard = undefined;
            };
          }
        } else {
          alert('Card has been flipped');
        }

      })
    },

};

$(document).ready(function() {

  controller.init();

 }); 