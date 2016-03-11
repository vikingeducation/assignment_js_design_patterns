var controller = {

    init: function(){
        view.init();
        model.generateCards();
        view.render();
        view.registerClickEvents();
    },


    clickCard: function(index) {
      if (model.clickCard(index)) {
        console.log('card already flipped')
      } else {
        model.cardMatch();
      }
    }

};