'use_strict;'

var controller = {
	init: function(){

		// Prompting user for a grid side length
		model.squaresPerSide = Number(prompt("How many squares per side? e.g. '3' for a 3 x 3 grid.", "6"));

	}
};

var model = {
	squaresPerSide: 6
};

var view = {

};

$(document).ready(function(){
	controller.init();
});