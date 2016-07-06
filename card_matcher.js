'use_strict;'

var controller = {
	init: function(){

		// Prompting user for a grid side length
		do {
			model.squaresPerSide = Number(prompt("How many squares per side? e.g. '3' for a 3 x 3 grid.", "6"));
		}
		// Keep prompting for even numbers
		// that are larger than 1
		while ( model.squaresPerSide <= 1 || model.squaresPerSide % 2 !== 0 );

		// Now that the user has provided that grid size,
		// construction of the grid can occur.
		view.init();

	}
};

var model = {
	squaresPerSide: 0
};

var view = {
	init: function(){

		// SETTING UP THE GRID
		// I think a for loop nested in a for loop should do the trick
		// The top for-loop will be for the rows
		// and the nested for each box inside the row.
		var grid = "";
		for (var i = 0; i < model.squaresPerSide; i++) {
			var row = "<div class='grid-row'>"
			for (var j = 0; j < model.squaresPerSide; j++) {
				row += "<div class='square' id='square-";
				row += i;
				row += "-";
				row += j;
				row += "' ></div>";
			};
			row += "</div>";
			grid += row;
		};
		$('#grid').append(grid);

		// PUTTING A VALUE INTO EACH SQUARE
		// I'm thinking the easiest way to do this is by again, going through a for loop and then changing the text values of those squares...
		// First giving the jQuery selector result the ability to pop...
		jQuery.fn.pop = [].pop;
		// Now getting all squares and shuffling them...
		var shuffledSquares = $(".square").sort(function() {
  								return .5 - Math.random();
							  });
		for (var i = 0; i < (model.squaresPerSide * model.squaresPerSide / 2); i++) {

			// pop from results of shuffledSquares and give them i values! Boom baby
			shuffledSquares.pop().innerText = i;
			shuffledSquares.pop().innerText = i;
		};
	}
};

$(document).ready(function(){
	controller.init();
});