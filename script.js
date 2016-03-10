var view = {

  // rowNames = ["one", "two", "three", "four", "five", "six", "seven", "eight"]
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
    console.log(numPieces)
    // columns
    for (var i=0; i < this.rowNames.length; i++) {
      // rows
      for (row in this.rowNames) {
        this.renderCard(this.rowNames[row]);
      }
    }
  },


  toggleCard: function(target) {
    $(target).toggleClass('coverup');
    $(target).children().first().toggle(); // switches display: none
  },

  // that: this,

  eventListeners: {
    showCard: function() {
      $('.coverup').click( function(e) {
        view.toggleCard(e.target);
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
      return .5 - Math.random();
    });
  },



};




var controller = {
  init: model.createCards(),

  placeCards: function(){
    for (var i=0; i < model.gamePieces.length; i++){
      this.getRandomCard();
    }
  },
  getRandomCard: function(){
    return model.gamePieces.pop();
  },

}


$(document).ready(function(){
  // var ourModel = model;
  // view.renderBoard();

  // $('.img-bucket').text(model.emojis)



});
