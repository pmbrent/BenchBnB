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
      </div>
    );
  }
});

React.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Search} />
      <Route path="benches/new" component={BenchForm} />
    </Route>
  </Router>
), rootEl);

});
