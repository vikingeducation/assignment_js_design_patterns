var model = {

    gridSize:     2,
    cardList:     [],
    previousCard: undefined,
    previousID:   undefined,
    currentCard:  undefined,
    currentID:    undefined,
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
      //ourCard.flipped = !ourCard.flipped;
      if (ourCard === "previous" ) {
        this.previousCard.flipped = !this.previousCard.flipped
      } else {
        this.currentCard.flipped = !this.currentCard.flipped
      };
    },

    addScore: function() {
      this.currentScore++;
    },

    decreaseScore: function() {
      this.currentScore-- ;
    },

    cardMatch: function() {
      if (!this.previousCard) {
        this.previousCard = this.currentCard;
        this.previousID = this.currentID;
      } else {
        var previousValue = this.previousCard.value;
        var currentValue = this.currentCard.value;
        if (currentValue === previousValue) {
          addScore();
          this.previousCard = undefined;
          view.displayScore(score);
        } else {
          decreaseScore();
          view.displayScore(score);

          changeState("previous");
          changeState("current");

          view.displayCard('#' + model.previousID,false) {
          this.previousCard = undefined;
        };
    }
    /*
    clickCard: function(index,target) {
        this.currentCard = this.getGenerateCards()[index];
        this.currentId = index;
        var state = this.getCardState(currentCard);
        return state;
    }
        if (!state) {
          //$target = $(eventObj.target);
          var val = target.attr( "data-card-value");

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
    },
    */

};