var model = {
  init: function(gridSize){
    this.gridSize = gridSize;
    this.grid = Array.new(gridSize*gridSize);
    this.setupGrid(); 
  },

  setupGrid: function(){
   var possibleLetters = this.letterArray.slice(0,gridSize);
   possibleLetters.forEach(function(el){
    this.grid.push(el);
    this.grid.push(el);
   });
   shuffle(this.grid);
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
  }

};

var controller = {
  init: function(){
    this.view = view;
    this.view.init();
    this.model = model.init(this.view.getGridSize());
  }
};