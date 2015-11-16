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
      <Map bench={this.state.bench}/>
    );
  }}

});
