import React, { Component } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

class Services extends Component {
  state = {
    data: []
  };
  async componentDidMount() {
    const response = await axios
      .get(
        "https://studybuddypakistan.herokuapp.com/enrollmentbystudent?id=" +
          this.props.match.params.id
      )
      .then(result => {
        console.log(result.data[0]);
        return result;
      });

    this.setState({
      data: response.data
    });
  }
  render() {
    let data = this.state.data;
    let Datalist;
    if (data.length === 0) {
      // Display a message when no data is available
      Datalist = <h3>No groups found.</h3>;
    } else Datalist = data.map((val, i) => {
      return (
        <div
          className="col-lg-4 col-md-6 col-12 section-space--bottom--30"
          key={i}
        >
          <div className="service-grid-item">
            <div className="service-grid-item__image">
              <div className="service-grid-item__image-wrapper">
                <a
                  href={
                    `${process.env.PUBLIC_URL}/` +
                    `blog-details-left-sidebar/` +
                    `${val.group._id}`
                  }
                >
                  {/* <img
                    src={val.group.groupImage}
                    className="img-fluid"
                    alt="Service Grid"
                  /> */}
                </a>
              </div>
              <div className="service-grid-item__content" >
                <h3 className="title" style={{ background: "#F6732E" }}>
                  <a
                    href={
                      `${process.env.PUBLIC_URL}/` +
                      `blog-details-left-sidebar/` +
                      `${val.group._id}`
                    }
                  >
                    {val.group.groupName}
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      );
    });

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
                  <h1>MY GROUPS</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of breadcrumb area  ====================*/}

        {/*====================  service page content ====================*/}
        <div className="page-wrapper section-space--inner--120">
          {/*Service section start*/}
          <div className="service-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="service-item-wrapper">
                    <div className="row">{Datalist}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Service section end*/}
        </div>

        {/*====================  End of service page content  ====================*/}

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default Services;
