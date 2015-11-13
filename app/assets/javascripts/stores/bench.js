(function(root) {

  var _benches = [];
  var CHANGE = "change";

  root.BenchStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _benches.slice();
    },

    resetBenches: function(benches) {
      _benches = benches;
    },

    addChangeListener: function(callback) {
      this.on(CHANGE, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case BenchConstants.BENCHES_RECEIVED:
          BenchStore.resetBenches(payload.benches);
          BenchStore.emit(CHANGE);
          break;
      }
    })

  });

})(this);
