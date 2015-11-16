window.Map = React.createClass({

  googleMap: undefined,
  _markers: [],

  componentDidMount: function() {
    this.googleMap = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 40.724948, lng: -73.998893},
      zoom: 13
    });

    BenchStore.addChangeListener(this.makeMarkers);
    MarkerStore.addHighlightListener(this.highlightMarker);

    this.googleMap.addListener('idle', function() {
      var nativeBounds = this.getBounds();

      FilterStore.updateParams({
          bounds: {
            northEast: {
              lat: nativeBounds.getNorthEast().lat(),
              lng: nativeBounds.getNorthEast().lng()
            },
            southWest: {
              lat: nativeBounds.getSouthWest().lat(),
              lng: nativeBounds.getSouthWest().lng()
            }
          }
        });

      ApiUtil.fetchBenches();
    });

    this.googleMap.addListener('click', this.clickMapHandler);
  },

  clickMapHandler: function(e) {
    coords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    this.props.onClick(coords);
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

  highlightMarker: function() {
    var bench = MarkerStore.highlightedBench();
    if (bench) {
      var id = bench.id;
    }
    this._markers.forEach(function(marker) {
      if (marker.id === id) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      } else {
          marker.setAnimation(null);
      }
    });
  },

  removeMarkers: function(oldMarkers) {
    oldMarkers.forEach(function(marker) {
      marker.setMap(null);
      this._markers.splice(this._markers.indexOf(marker), 1);
    }, this);
  },

  componentWillUnmount: function() {
    BenchStore.removeChangeListener(this.makeMarkers);
    MarkerStore.removeHighlightListener(this.highlightMarker);
  },

  render: function() {
    return <div id="map" ref="map"></div>;
  }

});
