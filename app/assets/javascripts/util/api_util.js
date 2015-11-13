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
  }
};
