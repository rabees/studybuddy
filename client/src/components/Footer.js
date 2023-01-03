import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        {/*====================  footer area ====================*/}
        <div className="footer-area dark-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="footer-content-wrapper section-space--inner--100">
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-12">
                      {/* footer intro wrapper */}
                      <div className="footer-intro-wrapper">
                        <div className="footer-logo">
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
                        </div>
                        <div className="footer-desc">
                          Find Your Perfect Study Buddy and Start Learning!
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-2 offset-xl-1 col-lg-3 col-md-4">
                      {/* footer widget */}
                      <div className="footer-widget">
                        <h4 className="footer-widget__title">USEFUL LINKS</h4>
                        <ul className="footer-widget__navigation">
                          <li>
                            <a href={`${process.env.PUBLIC_URL}/`}>Home</a>
                          </li>
                          <li>
                            <a href={`${process.env.PUBLIC_URL}/`}>
                              Company News
                            </a>
                          </li>
                          <li>
                            <a href={`${process.env.PUBLIC_URL}/`}>Projects</a>
                          </li>
                          <li>
                            <a href={`${process.env.PUBLIC_URL}/`}>Careers</a>
                          </li>
                          <li>
                            <a href={`${process.env.PUBLIC_URL}/`}>
                              Contact Us
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-2 offset-xl-1 col-lg-3 col-md-4">
                      {/* footer widget */}
                      <div className="footer-widget">
                        <h4 className="footer-widget__title">USEFUL LINKS</h4>
                        <ul className="footer-widget__navigation">
                          <li>
                            <a href={`${process.env.PUBLIC_URL}/`}>
                              Our Services
                            </a>
                          </li>
                          <li>
                            <a href={`${process.env.PUBLIC_URL}/`}>Showcase</a>
                          </li>
                          <li>
                            <a href={`${process.env.PUBLIC_URL}/`}>Affliates</a>
                          </li>
                          <li>
                            <a href={`${process.env.PUBLIC_URL}/`}>
                              Disclaimer
                            </a>
                          </li>
                          <li>
                            <a href={`${process.env.PUBLIC_URL}/`}>
                              Privacy Policy
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-2 offset-xl-1 col-lg-3 col-md-4">
                      {/* footer widget */}
                      <div className="footer-widget mb-0">
                        <h4 className="footer-widget__title">CONTACT US</h4>
                        <div className="footer-widget__content">
                          <p className="address">
                            National University of Computer & Emerging Sciences, FAST.
                          </p>
                          <ul className="contact-details">
                            <li>
                              <span>Phone:</span>55 66 88 526
                            </li>
                            <li>
                              <span>Fax:</span>55 44 77 62
                            </li>
                            <li>
                              <span>Email:</span>team@studybuddy.com
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright-wrapper">
            <div className="footer-copyright text-center">
            Copyright &copy; {new Date().getFullYear()} StudyBuddy. All rights reserved.
            </div>
          </div>
        </div>
        {/*====================  End of footer area  ====================*/}
        {/*====================  scroll top ====================*/}
        <button className="scroll-top" id="scroll-top">
          <i className="ion-android-arrow-up" />
        </button>
        {/*====================  End of scroll top  ====================*/}
      </div>
    );
  }
}
 
export default Footer;
