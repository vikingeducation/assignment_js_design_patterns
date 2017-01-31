"use strict";

var model = {
  gridSize: 0,

  setGridSize: function(size){
    this.gridSize = size;
  },

  getGridSize: function(){
    return this.gridSize;
  },

  createPictureCache: function(pictureQuantity){
    var newPicture,
        pictureCache = [],
        i = (pictureQuantity / 2);
    
    for (i; i > 0; i--) {
      newPicture = $("<div>", {class: "picture"});
      newPicture.identifier = String(i);
      
      pictureCache.push(newPicture, newPicture);
    }
    
    return pictureCache.sort(function(a,b){ 
      return Math.floor(Math.random() * pictureCache.length)
    });
  }
}; //model end