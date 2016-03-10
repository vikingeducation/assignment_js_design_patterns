var view = {

  // rowNames = ["one", "two", "three", "four", "five", "six", "seven", "eight"]
  init: function(){
    this.renderBoard();
    this.eventListeners.showCard();
    this.eventListeners.howManyFlipped();
  },

  rowNames: ["one", "two"],

  getRandomRow: function(){
    return Math.floor(Math.random() * this.rowNames.length);
  },


  renderCard: function(row){
    var div = $("#" + row).children().first();
    var randCard = $("<div class='col-sm-1 coverup'><img src='assets/" + controller.getRandomCard() + "'></div>")
    $(div).after(randCard);
  },

  renderBoard: function() {
    var numPieces = (this.rowNames.length*this.rowNames.length)
    // columns
    for (var i=0; i < this.rowNames.length; i++) {
      // rows
      for (row in this.rowNames) {
        this.renderCard(this.rowNames[row]);
      }
    }
  },


  // adds/removes .coverup, hides/shows images
  toggleCard: function(target) {
    $(target).toggleClass('coverup');
    $(target).children().first().toggle(); // switches display: none
  },


  hideCards: function(){
    if (!$('.clicked').hasClass('matched')) {
      $('.clicked').children().hide();
    }

    $('.clicked').addClass('coverup');
    $('.clicked').removeClass('clicked');
  },


  addMatchedClass: function() {
    $('.clicked').addClass('matched');
    $('.clicked').removeClass('clicked');
  },


  eventListeners: {
    showCard: function(){
      $('.coverup').click(function(e){
        view.toggleCard(e.target)
        $(e.target).addClass('clicked')
      })
    },

    howManyFlipped: function() {
      $('.coverup').click(function(e) {
        controller.incrementCounter();
        if (controller.checkMatch()) {
          controller.keepCards();
        } else if (!controller.checkMatch() && controller.cardsClicked === 2) {
          controller.noMatch();
        }
      })
    }
  }

};


var model = {

  emojis: ["andrew.svg",  "bear.svg",  "bob.svg",
    "canoe.svg",  "cheeky.svg",  "controller.svg",
    "devil.svg",  "eh.svg",  "einstein.svg", "whale.svg",
    "fithub.svg",  "ghost.svg",  "irs.svg",  "kit.svg",
    "mtn.svg",  "panda.svg",  "peace.svg",  "plane.svg",
    "poodle.svg",  "pug.svg",  "rainbow.svg",  "ram.svg",
    "rbf.svg",  "robot.svg",  "ruby.svg",  "russia.svg",
    "santa.svg",  "swirlie.svg",  "thumbsup.svg",
    "titanic.svg",  "twitter.svg",  "umbrella.svg"],

  //Actual cards used for game
  gamePieces: [],

  createCards: function() {
    var numRows = 2;
    var uniqueCards = (numRows*numRows) / 2;
    for (var i=0; i < uniqueCards; i++) {
      this.gamePieces.push(this.emojis[ Math.floor(Math.random() * this.emojis.length) ]);
    }
    // put two of each piece in our array
    this.gamePieces = this.gamePieces.concat(this.gamePieces);
    // shuffle our array
    this.gamePieces.sort(function() {
      return 0.5 - Math.random();
    });
  },

};




var controller = {

  cardsClicked: 0,

  init: function() {
    model.createCards();
    view.init();
  },

  placeCards: function(){
    for (var i=0; i < model.gamePieces.length; i++){
      this.getRandomCard();
    }
  },
  getRandomCard: function(){
    return model.gamePieces.pop();
  },

  checkMatch: function(){
    if (this.cardsClicked === 2) {
      return $('.clicked')[0].children[0].src === $('.clicked')[1].children[0].src;
    } 
  },

  incrementCounter: function() {
    this.cardsClicked++;
  },

  keepCards: function() {
    view.addMatchedClass();
    controller.cardsClicked = 0;
  },

  noMatch: function() {
    setTimeout(function() {
      controller.cardsClicked = 0;
      view.hideCards();
    }, 2000)
  },



}


$(document).ready(function(){

  controller.init();


});
