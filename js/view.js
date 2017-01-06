function Card() {
  var catImagePath = 'url(img/' + cats.shift() + ')';
  return $("<div class='card'>").css('background-image', catImagePath);
}
