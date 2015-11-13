window.Map = React.createClass({

  googleMap: undefined,
  _markers: [],

  componentDidMount: function() {
    this.googleMap = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 40.724948, lng: -73.998893},
      zoom: 13
    });
    BenchStore.addChangeListener(this.makeMarkers);

    this.googleMap.addListener('idle', function() {
      var nativeBounds = this.getBounds();

      var bounds = "bounds[northEast][lat]=" + nativeBounds.getNorthEast().lat();
          bounds += "&bounds[northEast][lng]=" + nativeBounds.getNorthEast().lng();
          bounds += "&bounds[southWest][lat]=" + nativeBounds.getSouthWest().lat();
          bounds += "&bounds[southWest][lng]=" + nativeBounds.getSouthWest().lng();

      ApiUtil.fetchBenches({bounds: bounds});
    });
  },

  makeMarkers: function() {
    var LatLng;
    var benches = BenchStore.all();
    var oldMarkers = [];

    oldMarkers = this._markers.filter(function(marker) {
      return benches.every(function(bench) {
        return marker.id !== bench.id;
      });
    });

    this.removeMarkers(oldMarkers);

    var ids = this._markers.map(function(marker) {
      return marker.id;
    });

    benches.forEach(function(bench) {
      if (ids.indexOf(bench.id) < 0) {
      LatLng = {lat: bench.lat, lng: bench.lng};
      this._markers.push(new google.maps.Marker({map: this.googleMap, position: LatLng,
        animation: google.maps.Animation.DROP, id: bench.id}));
      }
     }.bind(this));
  },

  removeMarkers: function(oldMarkers) {
    oldMarkers.forEach(function(marker) {
      marker.setMap(null);
      this._markers.splice(this._markers.indexOf(marker), 1);
    }, this);
  },

  render: function() {
    return <div id="map" ref="map"></div>;
  }

});
