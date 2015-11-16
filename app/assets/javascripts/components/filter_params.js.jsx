window.FilterParams = React.createClass({
  getInitialState: function() {
    var min = 1;
    var max = 5;

    params = FilterStore.all();

    if (typeof params.seating.min !== "undefined") {
      min = params.seating.min;
      max = params.seating.max;
    }

    return {seating: {min: min, max: max}};
  },

  updateMin: function(event) {

    var newState = {seating: {
        min: parseInt(event.currentTarget.value),
        max: this.state.seating.max
      }};

    this.setState(newState, FilterActions.updateParams(newState));
  },

  updateMax: function(event) {

    var newState = {seating: {
        min: this.state.seating.min,
        max: parseInt(event.currentTarget.value)
      }};

    this.setState(newState, FilterActions.updateParams(newState));
  },

  render: function() {
    return (
      <form>
        <label htmlFor="seating_min">Min. seating:
          <input type="text"
            id="seating_min"
            value={this.state.seating.min}
            onChange={this.updateMin}/>
        </label>
        <br/>
        <label htmlFor="seating_max">Max. seating:
          <input type="text"
            id="seating_max"
            value={this.state.seating.max}
            onChange={this.updateMax}/>
        </label>
      </form>);
  }
});
