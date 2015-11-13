window.Bench = React.createClass({

  render: function() {
    return (
      <li>
        <p>Latitutde: {this.props.bench.lat}</p>
        <p>Longitude: {this.props.bench.lng}</p>
        <p>Description: {this.props.bench.description}</p>
        <br />
      </li>
    );
  }

});
