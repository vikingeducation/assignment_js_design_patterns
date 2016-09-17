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
		var $bgPicture = $("<img>").attr("src", "img/bg.jpg");

		for (var i = 0; i < size; i++) {
			var picIndex = picArray.pop();
			var $randomPicture = $("<img>").attr("src", "img/" + picIndex + ".jpg")
				.addClass("back");
			var $front = $("<div></div>").addClass("front")
				.append($bgPicture.clone());
			var $back = $("<div></div>").addClass("back")
				.append($randomPicture);
			$('main section').append($block.clone()
				.append($front)
				.append($back));
		};
	},

	generatePicList: function (num) {
		var list = [];
	},


}
