var ApplicationController = {
  register: function(controller) {
    $.extend(controller, this);
  },

  render: function(template, data) {
    data = data || {};
    var rendered = new EJS({
      url: this._templatePath(template)
    }).render(data);
    CardMatcher.$container.html(rendered);
  },

  filter: function(params, permitted) {
    var filtered = {};
    for (var i = 0; i < permitted.length; i++) {
      var key = permitted[i];
      if (params[key] !== 'undefined') {
        filtered[key] = params[key];
      }
    }
    return filtered;
  },

  _templatePath: function(template) {
    return '/assets/js/card-matcher/views/' + 
      this.templateDirectory + 
      '/' + template + '.html.ejs';
  }
};

