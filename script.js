
var controller = {

  init: function(){
    viewPlay.init();
    controller.setCallbacks();
  },

  makeTurn: function(event){
    viewPlay.showSquare(event);
    viewPlay.renderInfo();
    viewPlay.checkGameOver();
  },

  setCallbacks: function(){
    $('table').on("click", "td[style*='opacity: 0']", controller.makeTurn);
  }
}


var viewPlay = {
  init:  function(){
    do {
      size = prompt("What is the size of the board?");
    } while(modelBoard.checkOdd());

    modelBoard.buildBoard(size);
    modelBoard.fillBoard();
    modelBoard.hideBoard();

  },



  showSquare: function(event){

    var $target = $(event.target)

    $target.css("cursor", "default")

    if (viewPlay.checkedSquare) {
      $target.css("opacity",1);
      modelBoard.attempt+=1;

      if ($target.text() !== viewPlay.checkedSquare.text()) {
        var clicked_box = viewPlay.checkedSquare;
        setTimeout(function(){
          viewPlay.hideSquare($target);
          viewPlay.hideSquare(clicked_box);
        }, 500);
      } else {
        modelBoard.match += 1;
      };
      viewPlay.checkedSquare = null;
    } else {
      viewPlay.checkedSquare = $target;
      $target.css("opacity",1);
    };

  },


  renderInfo: function(){
    $('#attempt').text(modelBoard.attempt);
    $('#score').text(Math.floor(modelBoard.match/modelBoard.attempt*100) || 0);
    $('#match').text(modelBoard.match);
  },

  checkGameOver: function() {
    if($('td[style*="opacity: 0"]').length === 0){
      $("button").removeClass("hidden");
      $('table').off();
      alert("Game over! You win!");
    }
  },

  checkedSquare: null,

  hideSquare: function(obj){
    obj.css("opacity",0).css("cursor", "pointer");
  }
}


var modelBoard = {

  size: 2,
  attempt: 0,
  match: 0,

  checkOdd: function() {
    return ( !(size % 2 == 0 ));
  },

  words: ["Play","Game","Sun","Cloud","Js","Java","CSS","Ruby"],

  buildBoard: function(size){
    $('#board-container').append('<table> </table>');
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

controller.init();
