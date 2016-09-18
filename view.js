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
			view.openCard(event);
			if (controller.imgsNotMatch()) {
				view.showScore();
				view.showAttempts();
				setTimeout(function () {
					view.closeOpenedCards();
				}, 1000);
			} else if (controller.imgsMatch()) {
				view.showScore();
				view.showAttempts();
				view.checkRightMatch();
				view.removeOpentag();
			};
			view.showGameOver();
		});
	},

	showGameOver: function () {
		if (controller.gameOver()) {
			$('.gameOver').html("game over");
			this.resetGame();
		};
	},

	showScore: function () {
		var score = controller.readScore();
		$('.score').html("Score: " + score);
	},

	resetGame: function () {
		controller.restValue();
		$('section').remove();
	},

	showAttempts: function () {
		var attempts = controller.getAttempts();
		$('.attempts').html("Attempts: " + attempts);
	},

	openCard: function (event) {
		var $target = $(event.target).parent();
		$target.hide();
		$target.next().fadeIn(500).addClass("opened");
	},

	closeOpenedCards: function () {
		$('.img-block .opened').hide();
		$('.img-block .opened').prev().show();
		this.removeOpentag();
	},

	removeOpentag: function () {
		$('.img-block .opened').removeClass("opened");
	},

	checkRightMatch: function () {
		var $checkItems = $(controller.getNeedCheckItems());
		$checkItems.addClass("checked");
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
