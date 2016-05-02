var view = {
  init: function(){
    // set listeners

    this.render();
  },

  render: function(){
    var score = controller.getScore();
    $('#score').text(score);

  }
};