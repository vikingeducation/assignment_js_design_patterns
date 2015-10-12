var model = {

	init: function(){
		this.score = 0;
		this.grid_size = window.prompt();
		
		// Gives us an array from 1-N with N being the grid_size squared
		var card_values_init = Array.apply(null, {length: (this.grid_size * this.grid_size)/2}).map(Number.call, Number);
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
	init: function(){
		// buffer will be the HTML for the card-table
		var buffer = '';
		// used to add unique classes to the cards
		var count = -1;

		// rows
		for(var i=0;i<model.grid_size;i++){
			buffer += '<tr>';
			for(var j=0;j<model.grid_size;j++){
				count++;
				buffer += '<td class="card-'+count+'">Card '+count+'</td>';
			}
			buffer += '</tr>';
		}

		$('#card-table').html(buffer);
		view.config();
		view.displayScore();
	}, 

	config: function(){
		// Set listeners on cards
		$('#card-grid').on('click', 'td', function(e){
			controller.flipCard($(e.target));
		});
	}, 

	displayScore: function(){
		$('#user-score').html("Score: " + model.getScore());
	}

	// Flip card
		// Returns face down if already flipped

	// Matched Card

	// Victory

	// Render

}


var controller = {
	init: function(){
		model.init();
		view.init();
	},

	// The number of cards currently face-up
	cards_up: 0,

	// Create a blank array to store the potential matches
	potential_matches: new Array, 

	// Flip card
	flipCard: function(card){		
		var card_number = card.attr('class').match(/(\d+)/g);
		card.html(model.card_grid[card_number]);
		card.addClass('potential-match');
		controller.potential_matches.push(model.card_grid[card_number]);
		controller.cards_up++;
		if(controller.cards_up == 2){
			setTimeout(controller.determineMatch, 1000);
		}
	},

	// Determine if match or not
	determineMatch: function(){
		if(controller.potential_matches.pop() == controller.potential_matches.pop()){
			// MATCH
			model.incScore(30);
			controller.cards_up = 0;
			$('.potential-match').removeClass('potential-match').addClass('match');
		} else {
			// NO MATCH
			$('.potential-match').each(function(i,e){
				var card_number = $(e).attr('class').match(/(\d+)/g);
				$(e).removeClass('potential-match').html('Card ' + card_number);
			});
			model.decScore(10);
		}
		controller.cards_up = 0;
		view.displayScore();
		controller.checkVictory();
	}, 

	checkVictory: function(){
		if($('.match').length == model.card_grid.length){
			alert("VICTORY");
		}
	}

}

$( document ).ready(function(){
	controller.init();
});