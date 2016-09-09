$(document).ready( 
  function() {
    controller.init();
  });

var model = {
  init: function(gridSize){
    this.gridSize = gridSize;
    this.grid = new Array(gridSize * gridSize);
    this.setupLetters();
    this.setupGrid(); 
  },

  setupGrid: function(){
   var possibleLetters = this.letterArray.slice(0,this.gridSize);

   var thatGrid = this.grid; 

   possibleLetters.forEach(function(el,index){
    //console.log(thatGrid);
    for (var i = 0; i < thatGrid.length; i++){
      thatGrid[i] = el;
      thatGrid[i+1] = el;
      i++;
    }
    
   });

   this.grid = this.shuffle(thatGrid);
  },

  setupLetters: function(){
    this.letterArray = [];
    for (var idx = "a".charCodeAt(0), end = "z".charCodeAt(0); idx <= end; idx++){
      this.letterArray.push(String.fromCharCode(idx));
    }
  },

  shuffle: function(grid){
    var j, x, i;
    for(i = grid.length; i; i--){
      j = Math.floor(Math.random()*i);
      x = grid[i-1];
      grid[i-1] = grid[j];
      grid[j] = x;
    }
  }

};

var view = {
  init: function(){
    this.gridSize = prompt("How big a grid do you want?");
  },

  getGridSize: function(){
    return this.gridSize;
  },

  renderCards: function(grid){
    grid.forEach( function(el, index) {
      var $card = $("<div>" + el + "</div>").attr("id", index).css("border", "1px solid");
      $(".card-container").append($card);
    });
  }

};

var controller = {
  init: function(){
    this.view = view;
    this.view.init();

    this.model = model;
    this.model.init(this.view.getGridSize());

    console.log("model's grid is" + this.model.grid);

    //renders all the cards from model onto the view
    debugger;
    this.view.renderCards(this.model.grid);



  }
};

