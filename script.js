$(document).ready(function(){
  controller.init();
});

//Controller
  //window prompt for grid size
  //Dont allow odd numbers
  //each grid different picture - repeat once for each pic
  //tells view when to cover up
  //when click tell view to render text/picture
  //GAME LOGIC
    //flips over first card
      //if another card is already exposed
        //check if it matches
        //if matches
          //keep both exposed
          //green border
          //add to score
          //START LOOP OVER
        //else if it doesn't match
          //cover up both cards - give it timeout - let user see cards
          //Score decreased
      //IF all cards exposed
        //GAME ENDS

      //

var controller = {

  init: function() {
    this.getGridSize();
    model.init();
    view.init();
  },


  getGridSize: function() {

    model.setGridSize(prompt("Enter grid size: "));

  }

};

//Model
  //will hold number for grid size
  //will hold pictures
  //SCORES
    //increase on successful matching
    //decrease on unsuccesful matching
  //ATTEMPTS
    //Increases everytime you flip at least two cards

var model = {

  gridSize: 0,
  cardsSources: ["1", "2", "3", "4", "5", "6", "7", "8"],
  //['kin10.jpg', jack.jpg]
  cards: [],

  init: function() {
    this.generateCards();
  },

  setGridSize: function(input) {
    n = parseInt(input);
    if (!isNaN(n)) {
      if (n === 2 || n === 4) {
        this.gridSize = n;
      }
      else {
        alert("Grid size must be 2 or 4");
        controller.getGridSize();
      }
    }
    else {
      alert("Must enter number");
      controller.getGridSize();
    }
  },

  generateCards: function() {
    for( var i = 0; i < model.gridSize/2; i++ ){
      this.cards.push($('<div class="col-md-' + 12 / model.gridSize + ' unexposed" >'+model.cardsSources[i]+'</div>'));
      this.cards.push($('<div class="col-md-' + 12 / model.gridSize + ' unexposed" >'+model.cardsSources[i]+'</div>'));
      //this.cards.push( $('<img src=' + model.cardsSources[i]+'>') )
    }
  },

  shuffle: function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

};

//View
  //model passes grid size for rendering
  //will render the cover up
  //will render text.picture of card when clicked from controller

var view = {

  init: function() {
    this.renderGrid();
  },

  renderGrid: function() {
    //model.cards.shuffle()
    model.shuffle(model.cards);
    for( var i = 0; i<model.cards.length; i++){
      model.cards[i].appendTo('.card-grid .row');
    }
  }


};










