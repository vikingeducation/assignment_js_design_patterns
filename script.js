// ------------------------------------------------------------------------
// General Helpers
// ------------------------------------------------------------------------
var shuffle = function (arr) {
  var a = arr;
  var j, x, i;
  for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
  }
  return a;
};

var partition = function(arr, chunk) {
  var acc = [];
  for (var i = 0, j = arr.length; i < j; i += chunk) {
    acc.push(arr.slice( i, i+chunk ));
  }
  return acc;
};

// ------------------------------------------------------------------------
// App-specific helpers
// ------------------------------------------------------------------------

var cards_per_row = function(cards_length) {
  if (cards_length < 14)
    return cards_length / 2;
  else
    return cards_length / 3;
}

var generate_cards = function(arr, n) {
  var cards = shuffle(arr).slice( 0, n/2 );
  return shuffle(cards.concat(cards));
};

var display_cards = function(cards) {
  var $html = $("<div></div>").addClass("card-matcher");

  // create and insert each card to the view
  $.each(cards, function(i, row) {
    var $row = $("<div></div>").addClass("row-of-cards");

    $.each(row, function(j, card_value) {
      var $card_value_container = $("<div></div>")
        .addClass("card_value vcenter-child")
        .html("?");

      var $card_container = $("<div></div>")
        .addClass("card vcenter-parent")
        .attr("coords", i + "," + j)
        .append($card_value_container);

      $row.append($card_container);
    });
    $html.append($row);
  });
  $(".container").append($html);
};

var get_coords = function(coords) {
  return coords.split(",").map(function(id) {
    return Number(id);
  });
};

var get_card_value = function(coords) {
  return db.cards[coords[0]][coords[1]];
}

var is_match = function() {
  if (db.first_card && db.second_card) {
    return get_card_value(db.first_card) === get_card_value(db.second_card);
  } else {
    return false
  }
};

var increment_score = function(db) {
  db.score += 1;
  $("#score").html(db.score);
}

var decrement_score = function(db) {
  db.score -= 1;
  $("#score").html(db.score);
}

var game_over = function() {
  if ($(".match").length === db.n_cards) {
    var $msg = $("<h2>Game Over!</h2>").addClass("text-center");
    $(".card-matcher").before($msg);
  }
}


// ------------------------------------------------------------------------
// State Management Helpers
// Based on `re-frame`s concept
// ------------------------------------------------------------------------

// events container
var events = {};

// state container
// TODO: number of cards as input
function DB() {
  this.ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
  this.set_cards = function(n) {
    this.cards = partition(generate_cards(this.ranks, n), cards_per_row(n));
    this.n_cards = n;
  };
  this.score = 0;
}
var db = new DB();

// - register an event for later dispatching
// - `f` is an effectful funcion that takes the state container
// and other arguments
// - Ideally all changes to `db` should be done through this
var reg_event_db = function(event, f) {
  events[event] = f.bind(null, db);
  return true;
};

// calls a registered handler
var dispatch = function(params) {
  var event, args, f;
  // event name
  event = params[0];
  // other arguments that may have been provided
  args = params.slice(1, params.length);
  // check if the function was previously registered
  f = events[event];
  if (f) {
    return f.apply(null, args);
  } else {
    console.log("No such function registered: `" + event + "`.");
    return false;
  }
};

// ------------------------------------------------------------------------
// Handlers
// ------------------------------------------------------------------------

reg_event_db("show-card", function(db, $card) {
  $card.addClass("matching");
  var rank = get_card_value(get_coords($card.attr("coords")));
  $card.children().html(rank);
});

reg_event_db("set-card", function(db, $card) {
  var coords = get_coords($card.attr("coords"));
  if (!db.first_card) {
    db.first_card = coords;
  } else {
    db.second_card = coords;
  }
});

reg_event_db("match", function(db) {
  increment_score(db);
  $(".matching").addClass("match").removeClass("matching");
  game_over();
});

reg_event_db("no-match", function(db) {
  db.showing_cards = false;
  decrement_score(db);
  $(".matching")
    .removeClass("matching")
    .children()
    .html("?");
  db.first_card = null;
  db.second_card = null;
});

// ------------------------------------------------------------------------
// App
// ------------------------------------------------------------------------

$(document).ready(function() {

  db.set_cards(Number(prompt("How many grids do you ant to play with?")));

  display_cards(db.cards);

  var game_loop = function(e) {
    // wait until the cards are hidden again
    if (db.showing_cards) { return }

    $card = $(e.target);
    dispatch(["show-card", $card]);
    dispatch(["set-card", $card]);

    // After clicking the first card, you must then click on another facedown
    // card and attempt to match it with the picture of the first one.

    // If you've successfully matched, both cards stay face up, are given
    // a green border, and a new turn begins. Your score is incremented by
    // some amount related to the total size of the board.
    if (is_match()) {
      console.log("match!");
      // green border
      // inc score
      dispatch(["match"]);
    } else {
      if (db.first_card && db.second_card) {
        db.showing_cards = true;
        setTimeout(function() {
          dispatch(["no-match"]);
        }, 500);
      }
    }
  };

  // ------------------------------------------------------------------------
  // Events
  // ------------------------------------------------------------------------

  // When you click on a face-down card, it reveals the picture underneath.
  $(".row-of-cards").on("click", ".card", function(e) {
    game_loop(e);
  });

});
