window.Map = React.createClass({

  googleMap: undefined,
  _markers: [],

  getInitialState: function() {
    var foundBench = null;
    if (typeof this.props.benchId !== "undefined") {
      foundBench = {bench: ApiUtil.findBench(this.props.benchId)};
    }
    return foundBench;
  },

  componentDidMount: function() {

    var lat = 40.724948;
    var lng = -73.998893;
    var zoom = 11;

    this.googleMap = new google.maps.Map(document.getElementById("map"), {
      center: {lat: lat, lng: lng},
      zoom: zoom
    });

    BenchStore.addChangeListener(this.makeMarkers);
    MarkerStore.addHighlightListener(this.highlightMarker);

    if (typeof this.props.benchId !== "undefined") {
      BenchStore.addBenchListener(this.receiveBench);

    } else {
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

    if (typeof this.props.benchId === "undefined") {
      this.googleMap.addListener('click', this.clickMapHandler);
    }

  }},

  receiveBench: function() {
    var newBench = BenchStore.all()[0];
    this.setState({bench: newBench});
    this.googleMap.setOptions({draggable: false,
                               center: {
                                 lat: this.state.bench.lat,
                                 lng: this.state.bench.lng},
                               zoom: 15});
    var LatLng = {lat: this.state.bench.lat, lng: this.state.bench.lng};
    this._markers.push(new google.maps.Marker({map: this.googleMap, position: LatLng,
      animation: google.maps.Animation.DROP, id: this.props.benchId}));
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
    if (this.state !== null) {
      BenchStore.removeChangeListener(this.makeMarkers);
      MarkerStore.removeHighlightListener(this.highlightMarker);
    }
  },

  render: function() {
    return <div id="map" ref="map"></div>;
  }

});
