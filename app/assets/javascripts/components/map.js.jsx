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
    var benches = BenchStore.all();
    var LatLng;
    var oldMarkers = this._markers.slice();

    //check markers to see if a bench still matches them
    //if so remove them from oldMarkers which will be deleted
    //also remove the bench so it is not granted a duplicate marker
    this._markers.forEach(function(marker) {
      benches.some(function(bench) {

      // Floating point comparisons are fun! Beware type coercion;
      // toFixed returns a string!
        if (marker.position.lat().toFixed(6) == bench.lat &&
          marker.position.lng().toFixed(6) == bench.lng) {
            benches.splice(benches.indexOf(bench), 1);
            oldMarkers.splice(oldMarkers.indexOf(marker), 1);
            return true;
        }
      });
    });
    
    // Remove unneeded Markers using jQuery
    this._markers = $(this._markers).not(oldMarkers).get();

    // Make new Markers for remaining benches
    benches.forEach(function(bench) {
      LatLng = {lat: bench.lat, lng: bench.lng};
      this._markers.push(new google.maps.Marker({map: this.googleMap, position: LatLng,
        animation: google.maps.Animation.DROP}));
     }.bind(this));
  },

  removeMarkers: function(oldMarkers) {
    oldMarkers.forEach(function(marker) {
      marker.setMap(null);
    });
  },

  render: function() {
    return <div id="map" ref="map"></div>;
  }

});
