"use strict";

var model = {

  lastCard: null,
  currentCard: null,

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

  addCard: function(card){
    if (model.currentCard) {
      model.lastCard = model.currentCard;
    }
    model.currentCard = card;
  },

  nullCards: function(){
    model.lastCard = null;
    model.currentCard = null;
  },

  getCards: function(){
    return model.lastCard.add(model.currentCard);
  }

};



var view = {

  init: function() {
    view.eventHandlers();
  },

  eventHandlers: function() {
    $("div").on("click", function(){
      var card = $(this).children("img");
      card.fadeIn(500, function(){
        controller.checkCard(card);
      });
      
    });
  },

  placeCards: function(cardImgs) {
    var boardDivs = $("div");
    $.each(cardImgs, function(idx){
      $(boardDivs[idx]).append(model.randomSplice(cardImgs));
    });
  },

  hideCards: function(cards){
    cards.parent().animate({"border-color": "#FF0000"}, 500)
                  .animate({"border-color": "#bbb"}, 500)
                  .animate({"border-color": "#FF0000"}, 500)
                  .animate({"border-color": "#bbb"}, 500, 
                    function(){
                      cards.fadeOut(300);
                    });
  },

  matchedCards: function(cards){
    cards.parent().off("click").animate({"border-color": "#80FF00"}, 500,
      function(){ cards.show(); });
  }

};



var controller = {

  init: function(){
    var cardImgs = model.getCardImgs();
    view.init();
    view.placeCards(cardImgs);
  },


  checkCard: function(card){
    model.addCard(card);

    if (model.lastCard && model.currentCard) {
      if (model.lastCard[0].src == model.currentCard[0].src) {
        view.matchedCards(model.getCards());
        model.nullCards();
      } else {
        view.hideCards(model.getCards());
        model.nullCards();
      }
    }
  }

};


$( document ).ready( function(){
  controller.init();
});
