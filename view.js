"use strict"

var view = {
	init: function () {
		this.startButtonListener();
		this.cardClickListener();
	},

	startButtonListener: function () {
		$("button:contains('Start')").click(function () {
			$(this).hide();
			controller.saveSizeValue();
			view.setUpGrids();
		});
	},

	cardClickListener: function () {
		$('section').on('click', '.img-block .front', function (event) {
			var $target = $(event.target).parent();
			$target.hide();
			$target.next().fadeIn(500).addClass("opened");
			if (controller.imgsNotMatch()) {
				setTimeout(function () {
					view.closeOpenedCards();
				}, 1000);
			} else if (controller.imgsMatch()) {
				view.removeOpentag();
			};
		});
	},

	closeOpenedCards: function () {
		$('.img-block .opened').hide();
		$('.img-block .opened').prev().show();
		this.removeOpentag();
	},

	removeOpentag: function () {
		$('.img-block .opened').removeClass("opened");
	},



	setUpGrids: function () {
		var size = controller.readGridValue();
		var $block = $("<div></div>").addClass("img-block");
		var picArray = controller.readPicArray();
		var $bgPicture = $("<img>").attr("src", "img/bg.jpg");

		for (var i = 0; i < size; i++) {
			var picIndex = picArray.pop();
			var $randomPicture = $("<img>").attr("src", "img/" + picIndex + ".jpg");
			var $front = $("<div></div>").addClass("front")
				.append($bgPicture.clone());
			var $back = $("<div></div>").addClass("back")
				.append($randomPicture);
			$('main section').append($block.clone()
				.append($front)
				.append($back));
		};
	},




}
