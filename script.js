var view = function() {
  // flipping cards

  // rowNames = ["one", "two", "three", "four", "five", "six", "seven", "eight"]
  rowNames = ["one", "two"];

  placeCards = function(){

  }

}


var model = {
  // create cards, compare cards

  emojis: ["andrew.svg",  "bear.svg",  "bob.svg",
    "canoe.svg",  "cheeky.svg",  "controller.svg",
    "devil.svg",  "eh.svg",  "einstein.svg", "whale.svg",
    "fithub.svg",  "ghost.svg",  "irs.svg",  "kit.svg",  
    "mtn.svg",  "panda.svg",  "peace.svg",  "plane.svg",
    "poodle.svg",  "pug.svg",  "rainbow.svg",  "ram.svg",
    "rbf.svg",  "robot.svg",  "ruby.svg",  "russia.svg",
    "santa.svg",  "swirlie.svg",  "thumbsup.svg",
    "titanic.svg",  "twitter.svg",  "umbrella.svg"],

  gamePieces: this.emojis,

  createCards: function() {
    var numRows = 2;
    var uniqueCards = (numRows*numRows) / 2;
    for (var i=0; i < uniqueCards; i++) {

    }
  },




};




var controller = function() {

}


$(document).ready(function(){
  // var ourModel = model;

  $('.img-bucket').text(model.emojis)



});

