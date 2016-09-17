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
			return true;
		} else {
			return false;
		};
	},

	imgsMatch: function () {
		if (model.opendCardsNum() === 2 && model.opendCardsAllSame()) {
			return true;
		} else {
			return false;
		};
	}
};

$(document).ready(function () {
	controller.init();
});
