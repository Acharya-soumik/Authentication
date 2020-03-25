import React from "react";
import { Link, Redirect, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Home from "../Components/Home";
import { logout } from "../Redux/authAction";

const NotFound = props => {
  return <h2>Page Not Found :(</h2>;
};

function Routes(props) {
  const logoutHandler = () => {
    props.logout();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          User App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse pr-3" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link" href="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link" href="#">
                #
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link" href="#">
                #
              </Link>
            </li>
          </ul>
          {props.auth ? (
            <button
              className="btn btn-outline-danger  ml-auto"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline-success ml-auto">
              Login
            </Link>
          )}
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/register" component={() => <Register />} />
        <Route render={NotFound} />
      </Switch>
    </div>
  );
}
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});
const mapStateToProps = state => ({
  auth: state.auth.status
});
export default connect(mapStateToProps, mapDispatchToProps)(Routes);
