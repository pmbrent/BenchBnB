window.Index = React.createClass({

  getInitialState: function() {
    return { benches: BenchStore.all() };
  },

  componentDidMount: function() {
    BenchStore.addChangeListener(this.updateState);
  },

  updateState: function() {
    this.setState({ benches: BenchStore.all() });
  },

  render: function() {
    return (
      <ul className="BenchesIndex">
        {this.state.benches.map(function(bench) {
          return <Bench key={bench.id} bench={bench} />;
        })}
      </ul>
    );
  }

});
