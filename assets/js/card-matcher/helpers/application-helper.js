var ApplicationHelper = {
  partial: function(template, data) {
    return new EJS({
      url: this._partialPath(template)
    }).render(data);
  },

  _partialPath: function(template) {
    template = template.split('/').join('/_');
    return 'https://rawgit.com/BideoWego/assignment_js_design_patterns/master/assets/js/card-matcher/views/' + 
      template + '.html.ejs';
  }
};

$.extend(window, ApplicationHelper);

