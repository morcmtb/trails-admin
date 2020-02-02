import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../img/logo-white.png";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";

class Header extends Component {
  state = {
    navActive: false
  };

  toggleNav = e => {
    this.setState({
      navActive: !this.state.navActive
    });
  };

  render() {
    const is_active = this.state.navActive ? "is-active" : "";
    const { isAuthenticated, logout } = this.props;

    return (
      <header>
        <nav className="navbar is-info" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/trails">
                <img src={Logo} className="image" alt="Morcmtb Logo" />
              </Link>
              <div
                onClick={this.toggleNav}
                className={"navbar-burger " + is_active}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className={"navbar-end navbar-menu " + is_active}>
              {!isAuthenticated && (
                <Link
                  className="navbar-item"
                  to="/login"
                  onClick={this.toggleNav}
                >
                  Login
                </Link>
              )}
              {isAuthenticated && (
                <div className="navbar-item" onClick={() => logout()}>
                  Logout
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
