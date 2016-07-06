'use_strict;'

var controller = {
	init: function(){

		// Have to reset all those model figures at the start of each new game.
		model.init();

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
	init: function(){
		model.gameNumber++;
		model.squaresperSide = 0;
		model.numberOfAttempts = 0;
		model.firstSquareSelected = null;
		model.secondSquareSelected = null;
	},
	gameNumber: 0,
	squaresPerSide: 0,
	numberOfAttempts: 0,
	firstSquareSelected: null,
	secondSquareSelected: null
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

    	// When clicked each box should reveal what's underneath
		$(".square-cover").click( function(event){
			if (model.firstSquareSelected === null || model.secondSquareSelected === null){
				$(event.target).slideUp(1000);
			};
		});

		// This is a listener for the count ups...
		$(".square-cover").click( function(event){
			// If the current target isn't either of the selected then let's add to the count.
			if( ($(event.target)[0]["id"] !== model.firstSquareSelected && $(event.target)[0]["id"] !== model.secondSquareSelected) && (model.firstSquareSelected === null || model.secondSquareSelected === null) ){
				model.numberOfAttempts++;
				$("#number-of-attempts").text(model.numberOfAttempts);
			};
		});

		// How about a listener which stores which one is being looked at right now...
		$(".square-cover").click( function(event){
			// If the current target isn't either of the selected then let's add to the count.
			if ( model.firstSquareSelected === null ){
				model.firstSquareSelected = $(event.target)[0]["id"];

			} else if ( model.firstSquareSelected !== $(event.target)[0]["id"] && model.secondSquareSelected === null ){
				model.secondSquareSelected = $(event.target)[0]["id"];
				if ($("#" + model.firstSquareSelected).parent().text() !== $("#" + model.secondSquareSelected).parent().text()) {
					view.timeoutSlide();
				} else {
					// So this is where we have a match!
					view.timeOutSquareSelectedReset();

					// We need to check everytime there's a match if it's the end of the game
					// If it is the game
					// We need to display a button that will let people restart the game
					// and also keep a track of previous scores on the screen
					if ($(".square-cover:visible").length === 0) {

					};
				};
			};
		});
	},

	squareCover: function(rowNumber, colNumber){
		var string = "<div class = 'square-cover' id ='square-cover-";
		string += rowNumber;
		string += "-";
		string += colNumber;
		string += "'></div>";
		return string;
	}, 

	timeoutSlide: function(){
		setTimeout(function(){
			$("#" + model.firstSquareSelected).slideDown(1000);
			$("#" + model.secondSquareSelected).slideDown(1000);
			model.firstSquareSelected = null;
			model.secondSquareSelected = null;
		}, 1000);
	},

	timeOutSquareSelectedReset: function(){
		setTimeout(function(){
			model.firstSquareSelected = null;
			model.secondSquareSelected = null;
		}, 1000);
	}
};

$(document).ready(function(){
	controller.init();
});