var numberOfCardPairs = Number(prompt("How many card pairs? (2-8)"));

for (var i = 0; i < numberOfCardPairs; i++) {
  var $card = Card();
  $card.appendTo('#cards');
  $card.clone().appendTo('#cards');
}
