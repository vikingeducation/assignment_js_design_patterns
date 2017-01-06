(function(){
  window.Ready = {}

  var readyBound = false;
  var isReady = false;
  var readyList = [];

  // Handle when the DOM is ready
  function domReady() {
    // Make sure that the DOM is not already loaded
    if(!isReady) {
      // Remember that the DOM is ready
      isReady = true;

      if(readyList) {
        for(var fn = 0; fn < readyList.length; fn++) {
          readyList[fn].call(window, []);
        }

        readyList = [];
      }
    }
  };

  // From Simon Willison. A safe way to fire onload w/o screwing up everyone else.
  function addLoadEvent(func) {
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {
      var old = window.onload;
      window.onload = function() {
        if (oldonload) {
          old();
        }
        func();
      }
    }
  };

  // does the heavy work of working through the browsers idiosyncracies (let's call them that) to hook onload.
  function bindReady() {
    if(readyBound) {
      return;
    }

    readyBound = true;

    // Mozilla, Opera (see further below for it) and webkit nightlies currently support this event
    if (document.addEventListener) {
      // Use the handy event callback
      document.addEventListener("DOMContentLoaded", domReady, false);

    } else if ( document.attachEvent ) {
      // ensure firing before onload,
      // maybe late but safe also for iframes
      document.attachEvent("onreadystatechange", function(){
        if ( document.readyState === "complete" ) {
          document.detachEvent( "onreadystatechange", arguments.callee );
          domReady();
        }
      });

      // If IE and not an iframe
      // continually check to see if the document is ready
      if ( document.documentElement.doScroll && window == window.top ) (function(){
        if ( isReady ) return;

        try {
          // If IE is used, use the trick by Diego Perini
          // http://javascript.nwbox.com/IEContentLoaded/
          document.documentElement.doScroll("left");
        } catch( error ) {
          setTimeout( arguments.callee, 0 );
          return;
        }

        // and execute any waiting functions
        domReady();
      })();
    } else {
      // A fallback to window.onload, that will always work
      addLoadEvent(domReady);
    }
  };

  // This is the public function that people can use to hook up ready.
  Ready.run = function(fn, args) {


    // If the DOM is already ready
    if (isReady) {
      // Execute the function immediately
      fn.call(window, []);
    } else {
      // Attach the listeners
      bindReady();
      // Add the function to the wait list
      readyList.push( function() { return fn.call(window, []); } );
    }
  };

  bindReady();

})();

var MemoryGame = function() {
  if(!(this instanceof MemoryGame)) return new MemoryGame();

  var self = this;
  Ready.run( function() {
    self.Controller.init();
  });
}

var $MGP = MemoryGame.prototype;

MemoryGame.Card = function(value, img) {
  this.value = value;
  this.src = img;
  this.flipped = false;
}

$MGP.Model = {
  cardSelections: [
    new MemoryGame.Card("cheese", "http://vignette1.wikia.nocookie.net/clubpenguin/images/5/59/Cheese_Pin.png/revision/latest?cb=20121229072939"),
    new MemoryGame.Card("chocolate", "http://dbclipart.com/wp-content/uploads/2016/05/Clipart-chocolate-clipart-cliparts-for-you.png")
  ],
  gameboard: [],
  chooseCards: function(num) {
    var selections = [];
    var shuffled = this.shuffle(this.cardSelections);
    for( var i = 0; i < num; i++ ) {
      selections.push(shuffled[i]);
      selections.push(shuffled[i]);
    }
    return this.shuffle(selections);
  },
  createPairs: function(cards) {
    var deck = [];

    for(prop in selections) {
      deck.push(selections[prop]);
      deck.push(selections[prop]);
    }

    return deck;
  },
  shuffle: function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
  },
  randomIndex: function(length) {
    return Math.floor(Math.random() * length);
  },
  init: function(num){
    this.gameboard = this.chooseCards(num || 2);
  }

}

$MGP.View = {
  gameWrapper: null,
  render: function(gameboard) {
    this.gameWrapper.innerHTML = "";

    for(var i = 0; i < gameboard.length; i++) {
      let card = this.createCard(gameboard[i].flipped, gameboard[i].value, i);
      let img  = this.createCardImage(gameboard[i].src);
      card.appendChild(img);
      this.gameWrapper.appendChild(card);
    }
  },
  createCard: function(status, value, i){
    var card = document.createElement('DIV');
    card.classList.add('card-wrapper');
    card.classList.add(status);
    card.setAttribute('data-value', value);
    card.setAttribute('data-index', i);
    return card;
  },
  createCardImage: function(src){
    var img = document.createElement('IMG');
    img.setAttribute('src', src);
    return img
  },
  setListeners: function(callback){
    self = this;
    this.gameWrapper.addEventListener('click', function(e){
      callback(e, self) });
      this.gameWrapper.addEventListener('touchstart', function(e){
        callback(e, self) });
      },
      init: function(callback) {
        this.gameWrapper = document.getElementsByTagName('memory-game')[0];
        this.setListeners(callback);
      }
    }

    $MGP.Controller = {
      flipCard: function(e, self){
        var target = (e.target.tagName === "IMG" ? e.target.parentElement : e.target);
        if(target.className.includes('card-wrapper')){
          console.log(target)
          // self.view.flipCard(target);
          // self.model.flipCard(e.target.getAttribute('data-value'));
        }
      },
      init: function() {
        this.view = $MGP.View;
        this.model = $MGP.Model;
        this.view.init(this.flipCard);
        this.model.init();
        this.view.render(this.model.gameboard)
      }

    }
    var newGame = new MemoryGame()
