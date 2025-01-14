import React, { Component } from "react";
import NavBar from "./NavBar";
import Profiles from "./profiles/Profiles";
import Footer from "./Footer";

class Services extends Component {
  render() {
    return (
      <div>
        {/* Navigation bar */}
        <NavBar />

        {/* breadcrumb */}
        {/*====================  breadcrumb area ====================*/}
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="page-banner text-center">
                  <h1>Instructor Profiles</h1>
                  <ul className="page-breadcrumb">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>All Profiles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of breadcrumb area  ====================*/}

        <div className="page-wrapper section-space--inner--120">
          <div className="service-section">
            <div className="container">
              <Profiles />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default Services;
