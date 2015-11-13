window.Map = React.createClass({

  googleMap: undefined,

  componentDidMount: function() {
    this.googleMap = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 40.724948, lng: -73.998893},
      zoom: 13
    });
    BenchStore.addChangeListener(this.makeMarkers);

    this.googleMap.addListener('idle', function() {
      ApiUtil.fetchBenches();
    });
  },

  makeMarkers: function() {
    var benches = BenchStore.all();
    var LatLng;
    benches.forEach(function(bench) {
      LatLng = {lat: bench.lat, lng: bench.lng};
      new google.maps.Marker({map: this.googleMap, position: LatLng,
        animation: google.maps.Animation.DROP});
    }.bind(this));
  },

  render: function() {
    return <div id="map" ref="map"></div>;
  }

});
