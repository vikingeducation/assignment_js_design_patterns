var model = {

  attempts: 0,
  pairs: [],
  matchedArray: [],

  addAttempts: function(){
    this.attempts++;
  },

  getAttempts: function(){
    return this.attempts;
  },

  setPairs: function(card){
    this.pairs.push(card);
    this.pairs.push(card);
  },

  getPairs: function(){
    return this.pairs;
  },

  setMatchedArray: function(card){
    this.matchedArray.push(card);
    this.matchedArray.push(card);
  },

  getMatchedArray: function(){
    return this.matchedArray;
  },

  checkWin: function(){
    if ( this.pairs.length === this.matchedArray.length ){  
      return true;
    } else {
      return false;
    }
  }

};