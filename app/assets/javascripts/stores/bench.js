(function(root) {

  var _benches = [];
  var CHANGE_EVENT = "change";

  root.BenchStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _benches.slice();
    },

    resetBenches: function(benches) {
      _benches = benches;
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case BenchConstants.BENCHES_RECEIVED:
          BenchStore.resetBenches(payload.benches);
          BenchStore.emit(CHANGE_EVENT);
          break;
      }
    })

  });

})(this);
