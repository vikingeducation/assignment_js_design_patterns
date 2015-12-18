var CardMatcher = {
  $container: null,

  init: function(options) {
    this.$container = $(options['container']);
    GamesController.make();
  }
};
