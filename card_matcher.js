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
		for (var rowNumber = 0; rowNumber < model.squaresPerSide; rowNumber++) {
			var row = "<div class='grid-row'>"
			for (var colNumber = 0; colNumber < model.squaresPerSide; colNumber++) {
				row += "<div class='square' id='square-";
				row += rowNumber;
				row += "-";
				row += colNumber;
				row += "' >";
				row += view.squareCover(rowNumber, colNumber);
				row += "</div>";
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
		for (var squareText = 0; squareText < (model.squaresPerSide * model.squaresPerSide / 2); squareText++) {

			// These two bits are adding the number but at the same time, keeping that inner div (the square cover)
			var currentSquare = shuffledSquares.pop();
			currentSquare.innerHTML = squareText + currentSquare.innerHTML;

			currentSquare = shuffledSquares.pop();
			currentSquare.innerHTML = squareText + currentSquare.innerHTML;

		};

		// The slide up and slide down for the intro.
		$(".square-cover").slideUp(2000);
		$(".square-cover").slideDown(2000);

		// I want to do a highlight on hover.
		// change the background-color to darkviolet on hover
		$(".square-cover").hover(
      		function(event){event.target.style["backgroundColor"] = "darkviolet"},
      		function(event){event.target.style["backgroundColor"]="black"}
    	);
	},

	squareCover: function(rowNumber, colNumber){
		var string = "<div class = 'square-cover' id ='square-cover-";
		string += rowNumber;
		string += "-";
		string += colNumber;
		string += "'></div>";
		return string;
	}
};

$(document).ready(function(){
	controller.init();
});