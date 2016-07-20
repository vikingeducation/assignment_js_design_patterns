var view = {
	firstFlip: false,
	secondFlip: false,
	cardValues: [],
	targets: [],
	cards: [],

	init: function() {
		view.drawGrid();

		$(".game").on("click", ".card", function(event) {
			var target = event.target;
			var $id = $(target).hasClass("card") ? $(target).attr("data-id") : $(target).parent().attr("data-id");

			if ( (model.find( $id ).flipped === true) ) {
				return false ;
			}

			if ( (model.find( $id ).matched === true) ) { 
				return false ;
			}

			if (view.firstFlip === false || view.secondFlip === false) {	
				view.cardValues.push( $(target).find(".image").html() );
				$(target).find(".image").show();
				view.targets.push( target );
				view.cards.push( model.find( $id ) );

				view.firstFlip === false ? view.firstFlip = true : view.secondFlip = true;
				
				if (view.secondFlip === true) {
					if (view.cardValues[0] === view.cardValues[1]) {
						console.log("match!");
						$(view.targets[0]).addClass("success");
						$(view.targets[1]).addClass("success");
						view.cards[0].matched = true;
						view.cards[1].matched = true;

						view.firstFlip = false;
						view.secondFlip = false;
						view.cardValues = [];
						view.targets = [];
						view.cards = [];

						view.updateScore();

					} else {	

						view.firstFlip = false;
						view.secondFlip = false;
						view.cardValues = [];
						$(view.targets[0]).find(".image").hide(1000);
						$(view.targets[1]).find(".image").hide(1000);
						view.targets = [];
						view.cards = [];

						view.updateAttempts();
					}
				}

			}
		})
	},

	drawGrid: function() {
		var cards = model.cards
		for(var i = 0; i < cards.length; i++) {
			view.drawCard(cards[i]);
		}
	},

	drawCard: function(card) {
		var newCard = $('<div class="card"></div>')
					  .attr("data-id", card.id);
	    var img = $('<div class="image"></div>')
	    		  .html(card.value);
	    newCard.append(img);
		newCard.appendTo( $('.game') );
		img.hide();
	},

	updateScore: function() {
		var score = $(".score").html();

		$(".score").html( parseInt(score) + 1 );
	},

	updateAttempts: function() {
		var attempts = $(".attempts").html();

		$(".attempts").html( parseInt(attempts) + 1 );
	}

}
