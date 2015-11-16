window.BenchForm = React.createClass({
  getInitialState: function() {
    var lat = 0;
    var lng = 0;

    if (this.props.location.query) {
      lat = parseFloat(this.props.location.query.lat);
      lng = parseFloat(this.props.location.query.lng);
    }

    return {lat: lat, lng: lng, description: "A nice place to sit."};
  },

  updateLat: function(event) {
    this.setState({lat: event.currentTarget.value});
  },

  updateLng: function(event) {
    this.setState({lng: event.currentTarget.value});
  },

  updateSeating: function(event) {
    this.setState({seating: event.currentTarget.value});
  },

  updateDescription: function(event) {
    this.setState({description: event.currentTarget.value});
  },

  submitForm: function(e) {
    e.preventDefault();
    ApiUtil.createBench(this.state);
    this.setState({lat: 0, lng: 0, description: "Another nice place to sit."});
  },

  render: function() {
    return (
      <div className="benchForm">
        <form onSubmit={this.submitForm}>
          <label htmlFor="lat">Latitude:
            <input type="text"
              id="lat"
              value={this.state.lat}
              onChange={this.updateLat}/>
          </label>
          <br/>
          <label htmlFfor="lng">Longitude:
            <input type="text"
              id="lng"
              value={this.state.lng}
              onChange={this.updateLng}/>
          </label>
          <br/>
          <label htmlFfor="seating">Seating:
            <input type="text"
              id="seating"
              value={this.state.seating}
              onChange={this.updateSeating}/>
          </label>
          <br/>
          <label htmlFor="description">Description:
            <textarea id="description"
              value={this.state.description}
              onChange={this.updateDescription}>
            </textarea>
          </label>
          <br/>
          <input type="submit" value="Add Bench!"/>
        </form>
        <br/>
        <a href="/#">Back to Main</a>
      </div>
    );
  }
});
