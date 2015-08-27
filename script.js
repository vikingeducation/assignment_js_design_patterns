var viewPlay = {

  setCallbacks: function(){ 
    $('table').on("click", "td", viewPlay.showSquare);
  },

  showSquare: function(event){
    $(event.target).css("opacity",1);

    setTimeout(function(){
      viewPlay.hideSquare(event);
    }, 1000);
    
  },

  hideSquare: function(event){
    $(event.target).css("opacity",0);
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

