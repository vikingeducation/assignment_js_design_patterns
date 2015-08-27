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

//gets gridsize
//checks to see if card match
var controller = {

  //if flag is true means we are looking for card to match
  flag: false,
  currentCard: null,
  lastClickedCard: null,

  init: function() {
    this.newGame();
    this.getGridSize();
    model.init();
    view.init();
  },

  newGame: function() {
    view.resetBoard();
    model.resetGuessCount();
    this.flag = false;
    this.currentCard = null;
    this.lastClickedCard = null;
  },


  getGridSize: function() {

    this.setGridSize(prompt("Enter grid size: "));
  },

  setGridSize: function(input) {
    n = parseInt(input);
    if (!isNaN(n)) {
      if (n === 2 || n === 4) {
        model.gridSize = n;
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

  checkCards: function(clickedCard) {
    if (this.flag) {
      if ($(clickedCard).html() === $(this.currentCard).html()) {
        $(clickedCard).addClass('match');
        $(this.currentCard).addClass('match');
        this.flag = false;
        this.currenCard = null;
        model.guessCount += 1;
        view.updateGuessCount();
        this.checkVictory();
      }
      else {

        setTimeout(function(){

          console.log("clickedCard" + $(clickedCard));
          console.log("currentCard:" + controller.currentCard);
          console.log("this:" + this);

          $(clickedCard).addClass('unexposed');
          $(controller.currentCard).addClass('unexposed');
          controller.flag = false;
          controller.currentCard = null;
          model.guessCount += 1;
          view.updateGuessCount();
        }, 1000);



        // this.flag = false;
        // this.currentCard = null;
        // model.guessCount += 1;
        // view.updateGuessCount();
      }
    }
    else {
      this.flag = true;
      this.currentCard = clickedCard;
    }
  },

  checkVictory: function(){
    victory = true;
    for (var i = 0; i < $('.card').length; i++){
      if (!$($('.card')[i]).hasClass('match')) {
        victory = false;
        break;
      };
    }
    if (victory) {
      alert("You win! It took " + model.guessCount + " tries! Press 'OK' to play again!");
      controller.init();
    }
  }

}

//Model
  //will hold number for grid size
  //will hold pictures
  //SCORES
    //increase on successful matching
    //decrease on unsuccesful matching
  //ATTEMPTS
    //Increases everytime you flip at least two cards

var model = {

  guessCount: 0,
  gridSize: 0,
  // cardsSources: ["1", "2", "3", "4", "5", "6", "7", "8"],
  cardsSources: ['fa fa-dropbox', 'fa fa-github', 'fa fa-skype', 'fa fa-linux', 'fa fa-instagram', 'fa fa-twitter', 'fa fa-facebook', 'fa fa-stack-exchange'],
  cards: [],

  init: function() {
    this.generateCards();
  },


  //builds the html DOM elements for cards depending on users suggested gridsize by shoveling into an array
  generateCards: function() {
    for( var i = 0; i < (model.gridSize*model.gridSize)/2; i++ ){
      this.cards.push($('<div class="well card text-center col-md-' + 12 / model.gridSize + ' unexposed" ><i class="'+model.cardsSources[i]+' fa-3x"></i></div>'));
      this.cards.push($('<div class="well card text-center col-md-' + 12 / model.gridSize + ' unexposed" ><i class="'+model.cardsSources[i]+' fa-3x"></i></div>'));
    }
  },

  //shuffles the array of DOM cards
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
  },

  resetGuessCount: function() {
    this.guessCount = 0;
    view.updateGuessCount();
  }

};

//View
  //model passes grid size for rendering
  //will render the cover up
  //will render text.picture of card when clicked from controller

var view = {

  init: function() {

    //reveals card on click
    //if card isnt already match
    //checks controllers game logic
    this.renderGrid();

    $('.card-grid').on('click', '.card', this.clickTracker);
  },

  clickTracker: function(event){
    $(event.target).removeClass('unexposed');
    if (!$(event.target).hasClass('match')) {
      controller.checkCards(event.target);
    }
  },

  //actaully appends the array of DOM elements to HTML
  renderGrid: function() {
    //model.cards.shuffle()
    model.shuffle(model.cards);
    for( var i = 0; i<model.cards.length; i++){
      model.cards[i].appendTo('.card-grid .card-row');
    }
  },

  updateGuessCount: function() {
    $('#guess-count').html(model.guessCount);
  },

  resetBoard: function() {
    model.cards = [];
    $('.card').remove();
    $('.card-grid').off('click', '.card', view.clickTracker);
  }


};