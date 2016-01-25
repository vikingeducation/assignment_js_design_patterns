"use strict";

var model = {

  lastCard: "",
  currentCard: "",

  getCardImgs: function(){
    var emojiPngs = ["1f400.png", "1f403.png", "1f405.png", "1f408.png", 
        "1f409.png", "1f410.png", "1f411.png", "1f413.png", "1f415.png", 
        "1f417.png", "1f418.png", "1f419.png", "1f420.png", "1f421.png", 
        "1f422.png", "1f423.png", "1f426.png", "1f427.png", "1f428.png", 
        "1f429.png", "1f433.png", "1f61c.png", "1f63a.png", "1f64a.png"];

    var cards = [];

    while ( cards.length<8 ) {
      var imgSrc = "<img src='img/" + model.randomSplice(emojiPngs) + "'>";
      cards.push(imgSrc);
    }
    return cards.concat(cards);
  },

  randomSplice: function(array){ 
    var idx = model.getRandomIntInclusive(0, array.length - 1);
    return array.splice(idx,1)[0];
  },

  getRandomIntInclusive: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  cardMatch: function() {}

};

var view = {

  init: function() {
    view.eventHandlers();
  },

  eventHandlers: function() {
    $("div").on("click", function(){
      var card = $(this).children("img");
      card.show();
      controller.revealCard(card);
    });
  },

  placeCards: function(cardImgs) {
    var boardDivs = $("div");
    $.each(cardImgs, function(idx){
      $(boardDivs[idx]).append(model.randomSplice(cardImgs));
    });
  },

  hideCards: function(cards){
    $.each(cards, function(i, val){
      $(val).hide();
    });
  }



};


var controller = {

  init: function(){
    var cardImgs = model.getCardImgs();
    view.init();
    view.placeCards(cardImgs);
  },


  revealCard: function(card){
    if (model.currentCard) {
      model.lastCard = model.currentCard;
    }

    model.currentCard = card;

    console.log("current: " + model.currentCard[0].src)
    console.log("last " + model.lastCard[0].src)
    if (model.lastCard[0].src && model.currentCard[0].src) {
      if (model.lastCard == model.currentCard) {
        model.lastCard = "";
        model.currentCard = "";
      } else {
        view.hideCards(model.lastCard, model.currentCard);
        model.lastCard = "";
        model.currentCard = "";
      }
    }
  }

};


$( document ).ready( function(){
  controller.init();
});
