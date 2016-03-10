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
      if (ourCard === "previous" ) {
        this.previousCard.flipped = !this.previousCard.flipped;
        console.log('Card ' + this.previousCard.value + ' flipped')
      } else {
        this.currentCard.flipped = !this.currentCard.flipped;
        console.log('Card ' + this.currentCard.value + ' flipped')
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
        this.changeState('current')
        this.previousCard = this.currentCard;
        this.previousID = this.currentID;
        view.flipCard(this.currentID, true)
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

          this.changeState("previous");
          this.changeState("current");

          view.flipCard(this.previousID,false);
          view.flipCard(this.currentID,false);
          this.previousCard = undefined;
          this.previousID = undefined;
        };
      };
    },

    clickCard: function(index) {
        this.currentCard = this.getGenerateCards()[index];
        this.currentID = index;
        console.log('Current card:' + this.currentID);
        console.log('Previous card:' + this.previousID)
        var state = this.getCardState(this.currentCard);
        console.log(state);
        return state;
    }

};