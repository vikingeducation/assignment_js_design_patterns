var controller = {

    init: function(){
        view.init();
        model.generateCards();
        view.render();
        view.clickCard();
    },


    clickCard: function(index,target) {
      if (model.clickCard(index,target)) {
        
      } else {
        model.cardMatch();
      }
    }

};