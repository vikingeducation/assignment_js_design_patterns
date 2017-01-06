var view = {

  setUpListener: function(createPairs) {
    $('#submit-button').on('click', function(){
      var numPairs = $('#num-pairs').val();
      createPairs(numPairs);
    });
  },

  numberOfCardPairs: function() {
    Number(prompt("How many card pairs? (2-8)"));
  },

  Card: function() {
    var catImagePath = 'url(img/' + cats.shift() + ')';
    return $("<div class='card'>").css('background-image', catImagePath);
  }
 
};


