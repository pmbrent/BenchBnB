(function(root) {

  var _params = {
    bounds: {},
    seating: {
      min: 0,
      max: 5
    }
  };
  var CHANGE_EVENT = "change";

  root.FilterStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _params;  ////Danger!
    },

    updateParams: function(params) {

      if (typeof params.seating !== "undefined") {
        _params.seating.max = params.seating.max || _params.seating.max;
        _params.seating.min = params.seating.min || _params.seating.min;
      }

      if (typeof params.bounds !== "undefined") {
        _params.bounds = params.bounds;
      }

    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case FilterConstants.FILTERS_RECEIVED:
          FilterStore.updateParams(payload.params);
          FilterStore.emit(CHANGE_EVENT);
          break;
      }
    })

  });

})(this);
