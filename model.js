var model = {
	grid: 0,
	cards: [],
	values: [],

	init: function() {
		model.setGridSize();
		model.createCards();
	},

	getGridSize: function() {
		return model.grid;
	},

	setGridSize: function() {
		var wrongInput = true;
		while (wrongInput) {
			var size = prompt("Enter an even number for your grid size");

			if (size > 0 && size % 2 === 0) {
				model.grid = size;

				model.createValues();

				wrongInput = false;
			} else {
				wrongInput = true;
			}
		}
	},

	createValues: function() {
		var size = model.grid;

		// create Array of images
		for (var i = 1; i <= size/2; i++) {
			model.values.push(i);
			model.values.push(i);
		}

		// shuffle array of images
		for(var i = size - 1; i >= 0; i-- ) {
			var index = Math.floor(Math.random() * i);
			var temp = model.values[i];
			model.values[i] = model.values[index];
			model.values[index] = temp;
		}
	},

	createCards: function() {
		var cards = model.cards
		for (var i = 0; i < model.grid; i++) {
			var card = {
				value: model.values.pop(),
				id: i + 1,
				flipped: false,
				matched: false
			}
			cards.push(card);
		}
	}, 

	checkFlip: function(id) {
		for (var i = 0; i < model.cards.length; i++) {
			if ( model.cards[i].id === parseInt(id) ) {
				if (model.cards[i].flipped === false) {
					return true;
				}
			}
		}
		return false;
	},

	find: function(id) {
		for (var i = 0; i < model.cards.length; i++) {
			if ( model.cards[i].id === parseInt(id) ) {
				return model.cards[i];
			}
		}
		return false;
	}
}