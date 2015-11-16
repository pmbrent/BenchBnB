window.Search = React.createClass({

  getInitialState: function() {
    return ({params:
      {
        bounds: {
          northEast: 0,
          southWest: 0
        },
        seating: {
          min: 0,
          max: 5
        }
      }
    });
  },

  componentDidMount: function() {
    FilterStore.addChangeListener(this.updateParams);
  },

  updateParams: function() {
    this.setState({params: FilterStore.all()});
    ApiUtil.fetchBenches();  //needed?
  },

  clickMapHandler: function(coords) {
    this.props.history.pushState(null, "/benches/new", coords);
  },

  clickBenchHandler: function(bench_id) {
    this.props.history.pushState(null, "/bench/" + bench_id);
  },

  render: function() {
    return (
      <div>
        <Map onClick={this.clickMapHandler}/>
        <FilterParams/>
        <Index clickBenchHandler={this.clickBenchHandler}/>
      </div>
    );
  }

});
