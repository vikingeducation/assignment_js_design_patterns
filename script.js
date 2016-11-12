var model = {
  gridSize: 0,
  images: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
  imageUrls: [],
  temporalList: [],
  score: 0,
  init: function() {
    var numUrls = model.gridSize * model.gridSize;
    for (var i = 0; i < numUrls/2; i++) {
      var randomImage = model.images[Math.floor(Math.random()* model.images.length)];
      model.imageUrls.push('images/' + randomImage + '.png');
      model.imageUrls.push('images/' + randomImage + '.png');
    }
  },

  incrScore: function() {
    model.score += 1;
  },

  decrScore: function() {
    model.score -= 1;
  }
}

var view = {

  gridSetup: function() {
    var gridSize = model.gridSize;
    //init model (i.e. create cards url array)
    model.init();

    //edit the url of first div
    $('.facedown').attr('src', model.imageUrls.pop());

    //clone the col
    var row = $('.row');
    for(var i = 0; i < gridSize - 1; i++) {
      newCol = $('.col').last().clone();
      newCol.find('.facedown').attr('src', model.imageUrls.pop());
      newCol.appendTo(row);
    }

    //Now, clone the row
    var container = $('.container');
    for(var i = 0; i < gridSize - 1; i++) {
      newRow = $('.row').last().clone();
      newRow.appendTo(container);
      newRow.find('.facedown').each(function() {
        $(this).attr('src', model.imageUrls.pop());
      })
    }
  },

  OnBackOfTheCardListener: function() {
    $('img.backOfTheCard').on('click', function() {
      controller.flip(this);
      view.markAsTemp(this);
      controller.isMatch(this);
    });
  },

  OffBackOfTheCardListener: function() {
    $('img.backOfTheCard').off('click')
  },

  OnNewGameListener: function() {
    $('.start-game').on('click', function() {
      location.reload();
    });
  },

  init: function() {
    var ret = false;

    var gridSize = prompt("Please enter the grid size (Even Numbers only)");
    if (gridSize != null && gridSize % 2 == 0) {
      model.gridSize = Number(gridSize);
      ret = true;
    }

    //setup
    this.gridSetup();

    view.OnBackOfTheCardListener();

    return ret;
  },

  clear: function() {
    var first_row_col = $('.container .row .col').first().clone();
    $('.container .row').remove();
    first_row_col.appendTo($('.container'));
  },

  renderScore: function(newScore) {
    $('span.score').html(newScore)
  },

  markAsOpened: function(elem) {
    $(elem).parent().children().removeClass('closed temp').addClass('opened');
  },

  markAsTemp: function(elem) {
    $(elem).parent().children().removeClass('closed opened').addClass('temp');
  },

  markAsClosed: function(elem) {
    $(elem).parent().children().removeClass('temp opened').addClass('closed');
  }
};

var controller = {
  init: function() {

    while(true) {
      if (view.init() == true) {
        break;
      }
    }
    view.OnNewGameListener();
  },

  flip: function(elem) {
    $(elem).parent().children().toggleClass('facedown').toggleClass('faceup');
  },

  isMatch: function(elem) {
    var newImgObj =  $(elem).siblings().first();
    if (model.temporalList.length === 0) {
      model.temporalList.push(newImgObj);
      return;
    }

    view.OffBackOfTheCardListener();
    var listImgObj = model.temporalList.pop();
    if (newImgObj.attr('src') === listImgObj.attr('src')) {
      model.incrScore();
      view.markAsOpened(newImgObj);
      view.markAsOpened(listImgObj);
      view.renderScore(model.score);
      view.OnBackOfTheCardListener();
    } else {
      model.decrScore();
      setTimeout( function() {
        controller.flip($('.temp'));
        view.markAsClosed(newImgObj);
        view.markAsClosed(listImgObj);
        view.OnBackOfTheCardListener();
      }, 2000);
      view.renderScore(model.score);
    }
  }
}

$(document).ready(function(){
  controller.init();
});