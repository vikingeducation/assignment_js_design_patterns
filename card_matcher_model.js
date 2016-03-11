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

    changeState: function(ourCard,state) {

      if (ourCard === "previous" ) {
          card = this.previousCard;
      } else {
          card = this.currentCard;
      };

      console.log(ourCard + " card state is " + card.flipped);

      if (state != undefined) {
          card.flipped = state;
      } else {
          card.flipped = !card.flipped;
      };

      console.log("Changed card state to " + card.flipped);
    },

    addScore: function() {
      this.currentScore++;
    },

    decreaseScore: function() {
      this.currentScore-- ;
    },

    cardMatch: function() {

      if (this.previousCard === undefined) {

        this.changeState('current',true);
        
        this.previousCard = this.currentCard;
        this.previousID = this.currentID;

        view.flipCard(this.currentID, true);

      } else {

        var previousValue = this.previousCard.value;
        var currentValue = this.currentCard.value;
        
        if (currentValue === previousValue) {
          
          this.addScore();
          this.previousCard = undefined;
          view.displayScore(this.currentScore);

        } else {

          this.decreaseScore();
          view.displayScore(this.currentScore);

          this.changeState("previous",false);
          this.changeState("current",false);

          view.flipCard(this.currentID,true);
       
          var currentID = this.currentID;
          var previousID = this.previousID;
          window.setTimeout(function() {
            view.flipCard(currentID,false)
          }, 1000);
          window.setTimeout(function() {
            view.flipCard(previousID,false)
          }, 1000);

          this.previousCard = undefined;
          this.previousID = undefined;

        };
      };
    },

    clickCard: function(index) {
        this.currentCard = this.getGenerateCards()[index];
        this.currentID = index;
        var state = this.getCardState(this.currentCard);
        return state;
    }

};