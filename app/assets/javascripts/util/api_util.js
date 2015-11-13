window.ApiUtil = {
  fetchBenches: function() {
    $.ajax ({
      url: "/benches",
      method: "GET",
      dataType: "json",
      success: function(benches) {
        ApiActions.receiveAllBenches(benches);
      }
    });
  }
};
