window.ShowBench = React.createClass({

  getInitialState: function() {
    var foundBench = null;
    if (typeof this.props.benchId !== "undefined") {
      foundBench = {bench: ApiUtil.findBench(this.props.benchId)};
    }
    return foundBench;
  },

  componentDidMount: function() {
    BenchStore.addBenchListener(this.receiveBench);
  },

  receiveBench: function() {
    var newBench = BenchStore.all()[0];
    this.setState({bench: newBench});
  },

  render: function() {
    if (typeof this.state.bench === "undefined") {
      return <div></div>;
    } else {
    return (
      <Map bench={this.state.bench}/>
    );
  }}

});
