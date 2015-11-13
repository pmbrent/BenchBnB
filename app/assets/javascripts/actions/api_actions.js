window.ApiActions = {
  receiveAllBenches: function(benches) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  },

  highlightBench: function(bench) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_HIGHLIGHTED,
      bench: bench
    });
  },

  removeHighlight: function(bench) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.REMOVE_HIGHLIGHT,
      bench: bench
    });
  }
};
