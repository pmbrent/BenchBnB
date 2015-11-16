(function(root) {

  var _benches = [];
  var CHANGE_EVENT = "change";
  var BENCH_RECEIVED = "bench";

  root.BenchStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _benches.slice();
    },

    find: function(bench_id) {
      var bench = _benches.filter(function(bench) {
        return bench.id === bench_id;
      });
      return bench[0];
    },

    resetBenches: function(benches) {
      _benches = benches;
    },

    addBenchListener: function(callback) {
      this.on(BENCH_RECEIVED, callback);
    },

    removeBenchListener: function(callback) {
      this.removeListener(BENCH_RECEIVED, callback);
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
        case BenchConstants.BENCH_RECEIVED:
          BenchStore.resetBenches([payload.bench]);
          BenchStore.emit(BENCH_RECEIVED);
      }
    })

  });

})(this);
