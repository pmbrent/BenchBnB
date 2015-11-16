window.ApiUtil = {
  fetchBenches: function(boundsObj) {
    $.ajax ({
      url: "/benches?" + boundsObj.bounds,
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
