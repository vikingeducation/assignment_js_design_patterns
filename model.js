"use strict";

var model = {
  gridSize: 0,

  setGridSize: function(size){
    this.gridSize = size;
  },

  getGridSize: function(){
    return this.gridSize;
  },
  
  pictures: [],

  createPictureCache: function(){
    var newPicture,
        pictureCache = [],
        i = (this.gridSize / 2);
    
    for (i; i > 0; i--) {
      newPicture = $("<div>", {class: "picture"});
      newPicture.text(String(i));
      
      pictureCache.push(newPicture, newPicture.clone());
    }
    
    this.pictures = pictureCache.sort(function(a,b){ 
      return Math.floor(Math.random() * pictureCache.length)
    });
  }
}; //model end