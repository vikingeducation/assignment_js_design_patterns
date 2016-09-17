"use strict"

var view = {
	init: function () {
		this.startButtonlistener();
	},

	startButtonlistener: function () {
		$("button:contains('Start')").click(function () {
			$(this).hide();
			controller.saveSizeValue();
			view.setUpGrids();
		});
	},

	setUpGrids: function () {
		var size = controller.readGridValue();
		var $block = $("<div></div>").addClass("img-block");
		var picArray = controller.readPicArray();
		for (var i = 0; i < size; i++) {
			var picIndex = picArray.pop();
			var $randomPicture = $("<img>").attr("src", "img/" + picIndex + ".jpg")
			$('main section').append($block.clone().append($randomPicture));
		};
	},

	generatePicList: function (num) {
		var list = [];
	},


}
