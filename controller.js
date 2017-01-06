$MGP.Controller = {
  flipCard: function(e, self) {
    var target = (e.target.tagName === "IMG" ? e.target.parentElement : e.target);
    if(target.className.includes('card-wrapper')){
      $MGP.View.flipCard(target);
      if (!$MGP.Model.flipCard(+e.target.getAttribute('data-index'))){
        setTimeout( function(){
          $MGP.View.render($MGP.Model.gameboard);
        }, 2000)
      }
    }
  },
  init: function() {
    this.view = $MGP.View;
    this.model = $MGP.Model;
    this.view.init(this.flipCard);
    this.model.init();
    this.view.render(this.model.gameboard)
  }

}
