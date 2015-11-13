(function(root) {

  var currentBench;
  var HIGHLIGHT_EVENT = "highlight";

  root.MarkerStore = $.extend({}, EventEmitter.prototype, {

    highlightedBench: function() {
      return currentBench;
    },

    resetBench: function(bench) {
      currentBench = bench;
    },

    addHighlightListener: function(callback) {
      this.on(HIGHLIGHT_EVENT, callback);
    },

    removeHighlightListener: function(callback) {
      this.removeListener(HIGHLIGHT_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case BenchConstants.BENCH_HIGHLIGHTED:
          MarkerStore.resetBench(payload.bench);
          MarkerStore.emit(HIGHLIGHT_EVENT);
          break;
        case BenchConstants.REMOVE_HIGHLIGHT:
          MarkerStore.resetBench();
          MarkerStore.emit(HIGHLIGHT_EVENT);
          break;
      }
    })

  });

})(this);
