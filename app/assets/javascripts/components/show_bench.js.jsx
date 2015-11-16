window.ShowBench = React.createClass({

  getInitialState: function() {
    return {
      bench: ApiUtil.findBench(this.props.location.pathname.split("/")[2])
    };
  },

  componentDidMount: function() {
    BenchStore.addBenchListener(this.receiveBench);
  },

  receiveBench: function() {
    var newBench = BenchStore.all()[0];
    this.setState({bench: newBench});
  },

  render: function() {
    if (this.state === null || typeof this.state.bench === "undefined") {
      return <div></div>;
    } else {
    return (
      <div>
        <Map bench={this.state.bench}/>
          <li className="bench">
            <p>Latitude: {this.state.bench.lat}, Longitude: {this.state.bench.lng}</p>
            <p>Seats up to: {this.state.bench.seating}</p>
            <p>Description: {this.state.bench.description}</p>
          </li>
      </div>
    );
  }}

});
