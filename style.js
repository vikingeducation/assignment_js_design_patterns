var model = {

	init: function(){
		this.score = 0;
		var grid_size = window.prompt();
		
		// Gives us an array from 1-N with N being the grid_size squared
		var card_values_init = Array.apply(null, {length: (grid_size * grid_size)/2}).map(Number.call, Number);
		var card_grid = new Array;
		// give us an array with each element doubled up (for pairs)
		card_values_init.forEach(function(value){
			card_grid.push(value);
			card_grid.push(value);
		});
		this.card_grid = this.shuffle(card_grid);
	},
	
	incScore: function(amount){
		this.score += amount;
	}, 

	decScore: function(amount){
		this.score -= amount;
	}, 

	getScore: function(){
		return this.score;
	},

	shuffle: function(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex ;

	  while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

}


var view = {
	// init()
		// Get grid size from user and validate
		// Card listeners
		// Set cards
		// Render view

	// Icons
		// Hash of icons associated w/ a number (need 18, max grid size 6x6)

	// Flip card
		// Returns face down if already flipped

	// Matched Card

	// Victory

	// Render

}


var controller = {
	// Init
		// viewInit

	// Determine if match or not

	// Tell view to flip cards

}

$( document ).ready(function(){
	model.init();
	console.log(model.card_grid);
});