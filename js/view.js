var view = {

  setUpListener: function(createPairs) {
    $('#submit-button').on('click', function(event){
      var numPairs = $('#num-pairs').val();
      createPairs(numPairs);
    });
  },

  renderCard: function(modelCard) {
    var catImagePath = 'url(img/' + modelCard.imagePath + ')';
    return $("<div class='card'>").css('background-image', catImagePath);
  },

};
