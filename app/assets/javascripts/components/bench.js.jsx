window.Bench = React.createClass({

  highlightBench: function() {
    ApiActions.highlightBench(this.props.bench);
  },

  removeHighlight: function() {
    ApiActions.removeHighlight(this.props.bench);
  },

  render: function() {
    return (
      <li className="bench" onMouseEnter={this.highlightBench} onMouseLeave={this.removeHighlight}>
        <p>Latitude: {this.props.bench.lat}, Longitude: {this.props.bench.lng}</p>
        <p>Seats up to: {this.props.bench.seating}</p>
        <p>Description: {this.props.bench.description}</p>
      </li>
    );
  }

});
