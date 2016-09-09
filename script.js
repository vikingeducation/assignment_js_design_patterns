$(document).ready( 
  function() {
    controller.init();
  });

var model = {
  init: function(gridSize){
    this.correctScore = 0;
    this.gridSize = gridSize;
    this.grid = [];
    console.log(this.grid);
    this.setupLetters();
    this.setupGrid();
  },

  setupGrid: function(){
   var possibleLetters = this.letterArray.slice(0,this.gridSize);

   var thatGrid = this.grid; 

   possibleLetters.forEach(function(el,index){
    //console.log(thatGrid);
    thatGrid.push(el);
    thatGrid.push(el);
    
   });

   this.shuffle(thatGrid);
  },

  setupLetters: function(){
    this.letterArray = [];
    for (var idx = "a".charCodeAt(0), end = "z".charCodeAt(0); idx <= end; idx++){
      this.letterArray.push(String.fromCharCode(idx));
    }
  },

  compare: function(checkedBoxes) {
    var a = this.grid[(checkedBoxes[0])];
    var b = this.grid[(checkedBoxes[1])];


    if (a === b){
      this.correctScore += 1;
      return true;
    } else {
      return false;
    }
  }

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

    var clickCounter = 0;
    var clickedBoxes = [];
    $(".card-container").on("click", function(e) {
      if (clickCounter < 2){
        clickedBoxes.push($(e.target).attr("id"));
        $(e.target).removeClass("hidden-box");
        clickCounter++;
      }
      if (clickCounter === 2){
        // decides what to do with cards(stay face up or flip down);
        if (!(controller.compare(clickedBoxes)) {
          // find the div with id of clickedBoxes and give it hidden class

        } 
        clickedCounter = 0;
      }
    });
  },

  getGridSize: function(){
    return this.gridSize;
  },

  renderCards: function(grid){
    var columnWidth = Math.floor(12/this.gridSize);
    grid.forEach( function(el, index) {
      var $card = $("<div>" + el + "</div>")
        .attr("id", index)
        .addClass("box")
        .addClass("col-md-" + columnWidth)
        .addClass("hidden-box");

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
    this.view.renderCards(this.model.grid);
  },

  compare: function(checkedBoxes) {
    return this.model.compare(checkedBoxes);
  }
};

