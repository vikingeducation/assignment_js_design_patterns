var view = {

  // rowNames = ["one", "two", "three", "four", "five", "six", "seven", "eight"]
  init: function(){
    this.renderBoard();
    this.eventListeners.showCard();
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

  hideCards: function(){
    $.each($('img'), function(index, img){
      if(!$(img).hasClass('matched')){
        $(img).hide();
        $(img).parent().addClass('coverup');
        model.pickedCards = [];
      }
    })
  },


  // that: this,

  eventListeners: {

    showCard: function(){
      $('.coverup').click(function(e){
        view.toggleCard(e.target)
        $(e.target).addClass('clicked')
      })
    }
    // showCard: function() {
    //   $('.coverup').click( function(e) {
    //     //True on first card pick
    //     if(model.pickedCards.length <= 1){
    //       //Showing the card
    //       view.toggleCard(e.target);
    //       model.pickedCards.push(e.target.children[0].src);
    //       //If you've already stored the first card in the model
    //       if(model.firstCard ===0){
    //         //Storing first card in model
    //         model.firstCard = e.target;
    //       }
    //     }
    //     else if (model.checkMatch){
    //       $(e.target).addClass('matched');
    //       $(model.firstCard).addClass('matched');
    //       model.firstCard = 0;
    //     }
    //       else{
    //         view.hideCards();
    //       }
    //   })
    // },



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

  //Lists name of card img src tags for comparison
  pickedCards: [],

  //Holds first card picked for later comparison
  firstCard: 0,

  // checkMatch: function(){
  //   return model.pickedCards[0] === model.pickedCards[1];
  // },

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

  checkMatch: function(){
    return $('.clicked')[0].src === $('.clicked')[1].src));
  },
}


$(document).ready(function(){
  // var ourModel = model;
  // view.renderBoard();

  // $('.img-bucket').text(model.emojis)
  view.init();


});
