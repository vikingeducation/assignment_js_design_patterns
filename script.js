var viewPlay = {

  setCallbacks: function(){
    $('table').on("click", "td", viewPlay.showSquare);
  },

  showSquare: function(event){
    if (viewPlay.checkedSquare) {
      $(event.target).css("opacity",1);
      console.log($(event.target).text());
      console.log(viewPlay.checkedSquare.text());
      if ($(event.target).text() !== viewPlay.checkedSquare.text()) {
        var clicked_box = viewPlay.checkedSquare;
        setTimeout(function(){
          viewPlay.hideSquare($(event.target));
          viewPlay.hideSquare(clicked_box);
        }, 500);
      };
      viewPlay.checkedSquare = null;
    } else {
      viewPlay.checkedSquare = $(event.target);
      $(event.target).css("opacity",1);
    };

  },

  checkGameOver: function() {
    $("td")
  },

  checkedSquare: null,

  hideSquare: function(obj){
    obj.css("opacity",0);
  }
}


var modelBoard = {

  size: 2,
  init:  function(){
    do {
      size = prompt("What is the size of the board?");
    } while(modelBoard.checkOdd());

    modelBoard.buildBoard(size);
    modelBoard.fillBoard();
    modelBoard.hideBoard();
    viewPlay.setCallbacks();
  },


  checkOdd: function() {
    return ( !(size % 2 == 0 ));
  },

  words: ["Play","Game","Sun","Cloud","Js","Java","CSS","Ruby"],

  buildBoard: function(size){
    $('body').append('<table> </table>');
    for(var i=0; i<size;i++){
      $('table').append('<tr></tr>')
      for(var j=0; j<size;j++){
         $('tr').last().append('<td></td>')
      }
    }
  },

  fillBoard: function(){
    var pos = [], w = 0;
    for (var i = 0; i < (size * size); i++) {
      pos[i] = i;
    };
    pos = shuffle(pos);

    console.log(pos)

    for(var j = 0; j< pos.length; j++){
      $('tr td').eq(pos[j]).text(modelBoard.words[w])
      if (j % 2 == 1) w++;
    }
  },

  hideBoard: function(){
    $('td').css("opacity",0)
  }

}

modelBoard.init();


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

