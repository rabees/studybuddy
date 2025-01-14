import React, { Component } from "react";
import NavBar from "./NavBar";
import Dashboard from "./dashboard/Dashboard";
import Footer from "../components/Footer";

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
                  <h1>Dashboard</h1>
                  <ul className="page-breadcrumb">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>Dashboard</li>
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
              <Dashboard />
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
