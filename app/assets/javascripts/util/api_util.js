window.ApiUtil = {
  fetchBenches: function() {

    params = FilterStore.all();

    var bounds = "bounds[northEast][lat]=" + params.bounds.northEast.lat;
        bounds += "&bounds[northEast][lng]=" + params.bounds.northEast.lng;
        bounds += "&bounds[southWest][lat]=" + params.bounds.southWest.lat;
        bounds += "&bounds[southWest][lng]=" + params.bounds.southWest.lng;

    var seating = "seating[min]=" + params.seating.min;
        seating += "&seating[max]=" + params.seating.max;

    $.ajax ({
      url: "/benches?" + bounds + "&" + seating,
      method: "GET",
      dataType: "json",
      success: function(benches) {
        ApiActions.receiveAllBenches(benches);
      }
    });
  },

  createBench: function(bench) {
    $.ajax ({
      url: "/benches",
      method: "POST",
      dataType: "json",
      data: {bench: bench},
    });
  }
};
