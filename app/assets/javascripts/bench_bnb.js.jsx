$(function () {

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var rootEl = document.getElementById("content");

var App = React.createClass({
  render: function() {
    return (
      <div>
        <header><h1>Bench BnB</h1></header>
        {this.props.children}
        <footer>
          Don't see the bench you're looking for? Click the map to add one!
          <br/>
          Copyright 2015 App Academy
        </footer>
      </div>
    );
  }
});

React.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Search} />
      <Route path="benches/new" component={BenchForm} />
      <Route path="bench/:id" component={ShowBench} />
    </Route>
  </Router>
), rootEl);

});
