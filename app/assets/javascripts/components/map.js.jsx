window.Map = React.createClass({

  componentDidMount: function() {
    var map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 40.724948, lng: -73.998893},
      zoom: 13
    });
  },

  render: function() {
    return <div id="map" ref="map"></div>;
  }

});
