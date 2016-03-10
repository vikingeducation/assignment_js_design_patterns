var view = {
  // flipping cards

  // rowNames = ["one", "two", "three", "four", "five", "six", "seven", "eight"]
  rowNames: ["one", "two"],

  getRandomRow: function(){
    return Math.floor(Math.random() * this.rowNames.length)
  },


  renderCard: function(){
    var randRow = "#" + this.rowNames[this.getRandomRow()];
    console.log(randRow);
    console.log("<img src='assets/" + controller.getRandomCard() + "'>")
    $(randRow).append($("<img src='assets/" + controller.getRandomCard() + "'>"))
  }
};


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

  gamePieces: [],

  createCards: function() {
    var numRows = 2;
    var uniqueCards = (numRows*numRows) / 2;
    for (var i=0; i < uniqueCards; i++) {
      this.gamePieces.push(this.emojis[ Math.floor(Math.random() * this.emojis.length) ])
    }
    this.gamePieces = this.gamePieces.concat(this.gamePieces)//awesome!
  },




};




var controller = {
  init: model.createCards(),

  placeCards: function(){
    for (var i=0; i < model.gamePieces.length; i++){
      this.getRandomCard()
    }
  },
  getRandomCard: function(){
    return model.gamePieces.pop()
  },

}


$(document).ready(function(){
  // var ourModel = model;

  // $('.img-bucket').text(model.emojis)



});
