var GridsController = {
  templateDirectory: 'grids',

  gridParams: function() {
    return this.filter(this.params, [
      'size'
    ]);
  }
};

ApplicationController.register(GridsController);

