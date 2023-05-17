import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
// import SearchBar from "./SearchBar";

class BlogDetailsLeftSidebar extends Component {
  onTextSubmit = text => {
    // Handle the form submission based on the submitted text
    console.log("Submitted text:", text);
  
    // Perform the necessary actions
    // For example, you can make an API call using axios
    axios.get("https://studybuddypakistan.herokuapp.com/resources/search", {
      params: {
        q: text
      }
    })
      .then(response => {
        // Handle the response if needed
        console.log("API response:", response.data);
        // Update the state or perform any other actions
        this.setState({
          videos: response.data,
          selectedVideo: response.data[0]
        });
      })
      .catch(error => {
        // Handle the error if needed
        console.error("API error:", error);
        // Update the state or perform any other error handling actions
      });
  };  
  
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      user: JSON.parse(localStorage.getItem("userid")),
      userRole: JSON.parse(localStorage.getItem("userRole")),
      selectedVideo: null,
      enrolled: "ADD TO GROUP LIST",
      buttonclass: "btn btn-success",  
      addgroup: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

    console.log(`Form submitted:`);

    console.log(`Todo studentid: ` + this.state.user);
    console.log(`Todo groupid: ` + this.props.match.params.id);
    //console.log(`Todo approved: `);

    const newTodo = {
      student: this.state.user,
      group: this.props.match.params.id,
      approved: true
    };
    if (this.state.buttonclass === "btn btn-success") {
      axios
        .post("https://studybuddypakistan.herokuapp.com/enrollbystudent/add", newTodo)
        .then(result => {
          toast.success("Added successfully");
        })
        .catch(err => {
          // then print response status
          toast.error("Group not added");
        });
    } else {
      console.log(this.state.buttonclass);
      toast.error("Group already added");
    }
  }
  async componentDidMount() {
    if (this.state.userRole === "student") {
      this.setState({
        addgroup: true
      });
    }

    const response = await axios
      .get("https://studybuddypakistan.herokuapp.com/resources?id=" + this.props.match.params.id)
      .then(result => {
        console.log(
          "https://studybuddypakistan.herokuapp.com/checkenrollment?id=" +
            this.state.user +
            "&&groupid=" +
            this.props.match.params.id
        );
        // eslint-disable-next-line
        const responseEnrolled = axios
          .get(
            "https://studybuddypakistan.herokuapp.com/checkenrollment?id=" +
              this.state.user +
              "&&groupid=" +
              this.props.match.params.id
          )
          .then(result => {
            // eslint-disable-next-line
            if (result.data != undefined) {
              this.setState({
                enrolled: "ALREADY ENROLLED",
                buttonclass: "btn btn-danger"
              });
            } else {
              console.log(result.data);
            }
            //return result;
          });
        console.log(result.data[0]);
        return result;
      });

    this.setState({
      videos: response.data,
      selectedVideo: response.data[0],
      status: "loading"
    });
  }

  onVideoSelect = video => {
    this.setState({ selectedVideo: video });
  };

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
                  <h1>Group Details</h1>
                  <ul className="page-breadcrumb">
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of breadcrumb area  ====================*/}

        <div className="page-wrapper section-space--inner--120">
          <div className="project-section">
            <div className="container">
              {/* <SearchBar onFormSubmit={this.onTextSubmit} /> */}
              <div className="row">
                <div className="col-12 section-space--bottom--40">
                  <div className="ui container">
                    <div className="ui grid">
                      <div className="ui row">
                        <div className="eleven wide column">
                          <VideoDetail video={this.state.selectedVideo} />
                        </div>

                        <div className="five wide column">
                          <VideoList
                            onVideoSelect={this.onVideoSelect}
                            videos={this.state.videos}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-12 section-space--bottom--30 pl-30 pl-sm-15 pl-xs-15">
                  <div className="project-details">
                    <h2>
                      {" "}
                      {this.state.selectedVideo
                        ? this.state.selectedVideo.title
                        : this.state.status}
                    </h2>
                    <p>
                      {this.state.selectedVideo
                        ? this.state.selectedVideo.group.groupDescription
                        : this.state.status}
                    </p>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div>
                    <ToastContainer />
                    <button
                      type="button"
                      style={this.state.addgroup ? {} : { display: "none" }}
                      className={this.state.buttonclass}
                      onClick={this.onClick}
                    >
                      {this.state.enrolled}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />

      </div>
    );
  }
}

export default BlogDetailsLeftSidebar;
