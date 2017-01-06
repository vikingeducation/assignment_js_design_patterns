$MGP.View = {
  gameWrapper: null,
  render: function(gameboard) {
    var card, img;

    this.gameWrapper.innerHTML = "";

    for(var i = 0; i < gameboard.length; i++) {
      card = this.createCard(gameboard[i].flipped, gameboard[i].value, i);
      img  = this.createCardImage(gameboard[i].src);
      card.appendChild(img);
      this.gameWrapper.appendChild(card);
    }
  },
  createCard: function(status, value, i) {
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
  setListeners: function(callback) {
    this.gameWrapper.addEventListener('click', function(e){
      callback(e, self)
    });
    this.gameWrapper.addEventListener('touchstart', function(e){
      callback(e, self)
    });
  },
  flipCard: function(target) {
    target.classList.remove('false');
    target.classList.add('true');
  },
  init: function(callback) {
    this.gameWrapper = document.getElementsByTagName('memory-game')[0];
    this.setListeners(callback);
  }
}
