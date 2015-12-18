var BaseModel = {
  all: function() {
    return this._table;
  },

  register: function(model) {
    model._table = [];
    model._callbacks = {};
    $.extend(model, this);
  },

  make: function(object) {
    this._fireCallbacks('before', 'make', object);
    var defaultsClone = $.extend({}, this.defaults);
    object = $.extend(defaultsClone, object);
    this._fireCallbacks('after', 'make', object);
    return object;
  },

  save: function(object) {
    this._fireCallbacks('before', 'save', object);
    object.id = this._table.length;
    this._table.push(object);
    this._fireCallbacks('after', 'save', object);
    return object;
  },

  create: function(object) {
    this._fireCallbacks('before', 'create', object);
    object = this.make(object);
    object = this.save(object);
    this._fireCallbacks('after', 'create', object);
    return object;
  },

  update: function(object, attributes) {
    this._fireCallbacks('before', 'update', object);
    for (var key in attributes) {
      this._table[~~object.id][key] = attributes[key];
    }
    this._fireCallbacks('after', 'update', object);
    return object;
  },

  destroy: function(object) {
    this._fireCallbacks('before', 'destroy', object);
    this._table.splice(~~object.id, 1);
    this._fireCallbacks('after', 'destroy', object);
    return object;
  },

  find: function(id) {
    return this._table[~~id];
  },

  where: function(func) {
    var results = [];
    this._table.forEach(function(element, index) {
      if (func(element, index)) {
        results.push(element);
      }
    });
    return results;
  },

  addCallback: function(action, filter, key, func) {
    if (!this._callbacks[action]) {
      this._callbacks[action] = {};
    }
    if (!this._callbacks[action][filter]) {
      this._callbacks[action][filter] = {};
    }
    this._callbacks[action][filter][key] = func;
  },

  removeCallback: function(action, filter, key) {
    delete this._callbacks[action][filter][key];
  },

  _fireCallbacks: function(action, filter, object) {
    if (this._callbacks[action] && this._callbacks[action][filter]) {
      for (var key in this._callbacks[action][filter]) {
        this._callbacks[action][filter][key](object);
      }
    }
  }
};






