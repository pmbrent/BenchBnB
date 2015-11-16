window.FilterActions = {
  updateParams: function(params) {
    console.log(params.seating);
    AppDispatcher.dispatch({
      actionType: FilterConstants.FILTERS_RECEIVED,
      params: params
    });
  },
};
