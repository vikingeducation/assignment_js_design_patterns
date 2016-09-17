"use strict"

var controller = {
	init: function () {
		view.init();
	},

	saveSizeValue: function () {
		var size = prompt("Choose your grid size value!");
		while (size % 4 !== 0 || size > 16) {
			alert("Please input 4 or 8 or 16!");
			size = prompt("Choose your grid size value!");
		}
		model.setGridSize(size);
	},

	readGridValue: function () {
		return model.readGridSize();
	},

	readPicArray: function () {
		return model.generatePictureArray();
	},

	imgsNotMatch: function () {
		if (model.opendCardsNum() === 2 && !model.opendCardsAllSame()) {
			model.decrementScore();
			this.addOneTry();
			return true;
		} else {
			return false;
		};
	},

	imgsMatch: function () {
		if (model.opendCardsNum() === 2 && model.opendCardsAllSame()) {
			model.addScore();
			this.addOneTry();
			return true;
		} else {
			return false;
		};
	},

	readScore: function () {
		return model.getScore();
	},

	addOneTry: function () {
		model.incrementAttempts();
	},

	getAttempts: function () {
		return model.readAttempts();
	},

	getNeedCheckItems: function () {
		return model.opendCards();
	},

	gameOver: function () {
		if (model.checkedCard() > 0 && model.cardsLeft() === 0) {
			return true;
		} else {
			return false;
		};
	},

	restValue: function () {
		model.setGridSize(0);
		model.resetAttempts();
	}
};

$(document).ready(function () {
	controller.init();
});
