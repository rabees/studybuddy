import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class NavBar extends Component {
  onLogoutClick(e) {
    e.preventDefault();

    this.props.logoutUser();
    window.location.href = "/home-two";
  }

  state = {
    displayProp: "none",
    flexProp: "row"
  };
  classToggle = () => {
    console.log("hello");
    const { displayProp, flexProp } = this.state;
    this.setState({
      displayProp: displayProp === "none" ? "flex" : "none",
      flexProp: flexProp === "row" ? "column" : "row"
    });
  };

  render() {
    const { isAuthenticated, users } = this.props.auth;
    localStorage.setItem("userid", JSON.stringify(users.id));
    localStorage.setItem("userRole", JSON.stringify(users.role));
    const { displayProp, flexProp } = this.state;

    if (users.role === "admin") {
      return (
        <div>
          {/*====================  header area ====================*/}
          <div className="header-area header-sticky header-sticky--default">
            <div className="header-area__desktop header-area__desktop--default">
              {/*=======  header navigation area  =======*/}
              <div className="header-navigation-area default-bg">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      {/* header navigation */}
                      <div className="header-navigation header-navigation--header-default position-relative">
                        <div
                          className="header-navigation__nav position-static"
                          style={{ width: "100%" }}
                        >
                          <nav className="main-nav">
                            <a href={`${process.env.PUBLIC_URL}/home-two`}>
                              <div className="logoHead">
                                <img
                                  src="/assets/img/logo/logonew.png"
                                  alt=""
                                  className="sticky-logo img-fluid"
                                />
                                <h3>Study Buddy</h3>
                              </div>
                            </a>

                            <ul id="main-nav-ul">
                              <li>
                                <a href={`${process.env.PUBLIC_URL}/dashboard`}>
                                  DASHBOARD
                                </a>
                              </li>
                              <li>
                                <a href={`${process.env.PUBLIC_URL}/allusers`}>
                                  USERS
                                </a>
                              </li>
                              <li>
                                <a
                                  href={`${process.env.PUBLIC_URL}/ShowGroupList`}
                                >
                                  GROUPS
                                </a>
                              </li>
                              <li>
                                <a
                                  href={`${process.env.PUBLIC_URL}/ShowCategoryList`}
                                >
                                  CATEGORIES
                                </a>
                              </li>
                              <li>
                                <a
                                  href={`${process.env.PUBLIC_URL}/EnrollmentList`}
                                >
                                  ENROLLED USERS
                                </a>
                              </li>
                              <li className="inactive">
                                <a
                                  href="/#"
                                  onClick={this.onLogoutClick.bind(this)}
                                  className="nav-link"
                                >
                                  <img
                                    src="https://cdn1.iconfinder.com/data/icons/user-avatars-2/300/04-512.png"
                                    height="10px"
                                    width="10px"
                                    alt={users.first_name}
                                    style={{
                                      marginRight: "5px"
                                    }}
                                    className="sticky-logo img-fluid"
                                  />{" "}
                                  LOGOUT
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (users.role === "student") {
      var authLinks = (
        <React.Fragment>
        <li>
          <a href={`${process.env.PUBLIC_URL}/finalprofiles`}>Study Buddy Finder</a>
        </li>
        <li>
          <a href={`${process.env.PUBLIC_URL}/feed`}>FORUM</a>
          </li>
          <li className="has-children has-children--multilevel-submenu">
            <a href={`${process.env.PUBLIC_URL}/services`}>GROUPS</a>
            <ul className="submenu">
              <li>
                <a
                  href={
                    `${process.env.PUBLIC_URL}/servicesforstudent/` + users.id
                  }
                >
                  MY GROUPS
                </a>
              </li>
              <li>
                <a href={`${process.env.PUBLIC_URL}/services`}>ALL GROUPS</a>
              </li>
            </ul>
          </li>
          <li>
            <a href={`https://golden-vacherin-cddd13.netlify.app/`}>CHAT</a>{" "}
          </li>
          <li>
            <a href={`https://spiffy-arithmetic-f459d4.netlify.app/`}>VIDEO MEETING</a>{" "}
          </li>
          <li className="inactive">
            <a
              href="/#"
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <img
                src="https://cdn1.iconfinder.com/data/icons/user-avatars-2/300/04-512.png"
                alt={users.first_name}
                style={{ width: "25px", marginRight: "5px" }}
              />{" "}
              LOGOUT
            </a>
          </li>
        </React.Fragment>
      );
    }
    if (users.role === "instructor") {
        authLinks = (
        <React.Fragment>
        <li>
            <a href={`${process.env.PUBLIC_URL}/feed`}>FORUM</a>
        </li>
          <li className="has-children has-children--multilevel-submenu">
            <a href={`${process.env.PUBLIC_URL}/services`}>GROUPS</a>
            <ul className="submenu">
              <li>
                <a href={`${process.env.PUBLIC_URL}/services/` + users.id}>
                  MY GROUPS
                </a>
              </li>
              <li>
                <a href={`${process.env.PUBLIC_URL}/addgroup/` + users.id}>
                  ADD GROUPS
                </a>
              </li>
              <li>
                <a href={`${process.env.PUBLIC_URL}/add-resource/` + users.id}>
                  ADD RESOURCE
                </a>
              </li>
              <li>
                <a href={`${process.env.PUBLIC_URL}/services`}>ALL GROUPS</a>
              </li>
            </ul>
          </li>
          <li>
            <a href={`${process.env.PUBLIC_URL}/finaldashboard`}>PROFILE</a>{" "}
          </li>
          <li>
            <a href={`${process.env.PUBLIC_URL}/ischedule`}>MY SCHEDULE</a>{" "}
          </li>
          <li>
            <a href={`https://golden-vacherin-cddd13.netlify.app/`}>CHAT</a>{" "}
          </li>
          <li>
            <a href={`https://spiffy-arithmetic-f459d4.netlify.app/`}>VIDEO MEETING</a>{" "}
          </li>
          <li>
            <a
              href="/#"
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <img
                src="https://cdn1.iconfinder.com/data/icons/user-avatars-2/300/04-512.png"
                alt={users.first_name}
                style={{ width: "25px", marginRight: "5px" }}
              />{" "}
              LOGOUT
            </a>
          </li>
        </React.Fragment>
      );
    }
    const guestLinks = (
      <React.Fragment>
        <li>
            <a href={`${process.env.PUBLIC_URL}/home-two`}>
              HOME
            </a>
        </li>
        <li>
          <a href={`${process.env.PUBLIC_URL}/about-us`}>
            ABOUT
          </a>
        </li>
          <li>
          <Link className="nav-link" to="/login/student">
            LOGIN
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/login/instructor">
            Teach On Study Buddy
          </Link>
        </li>
      </React.Fragment>
    );

    return (
      <div>
        {/*====================  header area ====================*/}
        <div className="header-area header-sticky header-sticky--default">
          <div className="header-area__desktop header-area__desktop--default">
            {/*=======  header navigation area  =======*/}
            <div className="header-navigation-area default-bg">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    {/* header navigation */}
                    <div className="header-navigation header-navigation--header-default position-relative">
                      <div
                        className="header-navigation__nav position-static"
                        style={{ width: "100%" }}
                      >
                        <nav className="main-nav">
                          <a href={`${process.env.PUBLIC_URL}/home-two`}>
                            <div className="logoHead">
                              <img
                                src="/assets/img/logo/logo.png"
                                alt=""
                                className="sticky-logo img-fluid"
                              />
                              <h3>Study Buddy</h3>
                            </div>
                          </a>

                          <ul id="main-nav-ul">
                            {isAuthenticated ? authLinks : guestLinks}
                          </ul>

                          <div
                            className="Navbar__Link Navbar__Link-toggle"
                            onClick={this.classToggle}
                          >
                            <i className="fas fa-bars" />
                          </div>
                        </nav>
                        <nav
                          className="Navbar__Items"
                          style={{
                            display: displayProp
                          }}
                        >
                          <ul
                            style={{
                              display: displayProp,
                              flexDirection: flexProp
                            }}
                          >
                            <li className="has-children has-children--multilevel-submenu">
                              <a href={`${process.env.PUBLIC_URL}/home-two`}>
                                HOME
                              </a>
                              <ul className="submenu">
                                <li>
                                  <a
                                    href={`${process.env.PUBLIC_URL}/home-two`}
                                  >
                                    Homepage
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href={`${process.env.PUBLIC_URL}/about-us`}>
                                ABOUT
                              </a>
                            </li>
                            {isAuthenticated ? authLinks : guestLinks}
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*=======  End of header navigation area =======*/}
          </div>
        </div>
        {/*====================  End of header area  ====================*/}
      </div>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
