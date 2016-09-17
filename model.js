"use strict"

var model = {
	gridSize: 0,

	pictureIndex: [1, 2, 3, 4, 5, 6, 7, 8],

	setGridSize: function (size) {
		this.gridSize = size;
	},

	readGridSize: function () {
		return this.gridSize;
	},

	generatePictureArray: function () {
		var array = [];
		var shuffledIndex = this.shuffleArray(this.pictureIndex);
		for (var i = 0; i < this.readGridSize() / 2; i++) {
			array.push(shuffledIndex.pop());
		};
		var jointArray = array.concat(array);
		return this.shuffleArray(jointArray);
	},

	shuffleArray: function (array) {
		var currentIndex = array.length,
			temporaryValue, randomIndex;

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

	opendCards: function () {
		return $('.opened img');
	},

	opendCardsNum: function () {
		return this.opendCards().length;
	},

	opendCardsAllSame: function () {
		var cards = this.opendCards();
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].src !== cards[0].src) {
				return false;
			};
		};
		return true;
	}


}
