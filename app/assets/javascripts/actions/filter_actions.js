window.FilterActions = {
  updateParams: function(params) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.FILTERS_RECEIVED,
      params: params
    });
  },
};
