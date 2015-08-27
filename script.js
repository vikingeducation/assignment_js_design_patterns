var modelBoard = {

  size: 2,
  init:  function(){
    do {
      size = prompt("What is the size of the board?"); 
    }while(modelBoard.checkOdd());
    
    modelBoard.buildBoard(size);
    modelBoard.fillBoard();
  },


  checkOdd: function() {
    return ( !(size % 2 == 0 ));
  },

  words: ["Board","Game","Sun","Cloud","Js","Java","CSS","Ruby"],

  buildBoard: function(size){
    $('body').append('<table> </table>');
    for(var i=0; i<size;i++){
      $('table').append('<tr></tr>')
      for(var j=0; j<size;j++){
         $('tr').last().append('<td>Board</td>')
      }
    }
  },

  fillBoard: function(){
    var w = 0
    for(var i=0; i<size*size; i+=2){
      $('tr td').eq(i).text(modelBoard.words[w])
      $('tr td').eq(i+1).text(modelBoard.words[w])
      w++;
    }
  }


  
}

modelBoard.init()