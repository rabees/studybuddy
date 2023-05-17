import React, { Component } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowGroup = props => (
  <option key={props.todo.groupName} value={props.todo.groupName}>
    {props.todo.groupName}
  </option>
  // <button type="button" class="list-group-item list-group-item-action">{props.todo.groupName}</button>
);
export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      youtubelink: "",
      loaded: 0,
      Groups: [],
      group: "",
      title: ""
    };
    this.onChangeGroup = this.onChangeGroup.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeYouTubeLink = this.onChangeYouTubeLink.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "https://studybuddypakistan.herokuapp.com/groupbyinstructor?id=" +
          this.props.match.params.id
      )
      .then(response => {
        console.log(this.props.match.params.id);
        this.setState({ Groups: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  GroupList() {
    return this.state.Groups.map(function(currentTodo, i) {
      //  console.log(currentTodo.categoryName)
      return <ShowGroup todo={currentTodo} key={i} />;
    });
  }

  onChangeGroup(e) {
    this.setState({
      group: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeYouTubeLink(e) {
    this.setState({
      youtubelink: e.target.value
    });
  }
  checkMimeType = event => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = [];
    // list allow mime type
    const types = ["video/mp4", "video/mkv"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      // eslint-disable-next-line
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  maxSelectFile = event => {
    let files = event.target.files;
    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
      event.target.value = null;
      toast.warn(msg);
      return false;
    }
    return true;
  };
  checkFileSize = event => {
    let files = event.target.files;
    let size = 2000000000000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message is not same old that means it has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  onChangeHandler = event => {
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
        loaded: 0
      });
    }
  };
  onClickHandler = () => {
    console.log(`Todo group: ${this.state.group}`);
    console.log(`Todo title: ${this.state.title}`);
  
    if (!this.state.title) {
      toast.error("Title cannot be empty");
      return;
    }

    if (!this.state.selectedFile) {
      // eslint-disable-next-line
      this.state.selectedFile = [];
    }

    if (!this.state.youtubelink && !this.state.selectedFile.length) {
      toast.error("Please choose a file or add YouTube link");
      return;
    }
  
    const data = new FormData();
    data.append("group", this.state.group);
    data.append("title", this.state.title);
    // eslint-disable-next-line
    if (this.state.youtubelink == "") {
      for (var x = 0; x < this.state.selectedFile.length; x++) {
        data.append("file", this.state.selectedFile[x]);
      }
    } else {
      data.append("videoLink", this.state.youtubelink);
    }
  
    console.log(data);
    axios
      .post("https://studybuddypakistan.herokuapp.com/resources/localupload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        // then print response status
        toast.success("upload success");
      })
      .catch(err => {
        // then print response status
        toast.error("upload fail");
      });
      setTimeout(() => {
        window.location.reload();
      }, 1300);
      
  };


  render() {
    var message2 = "you have selected " + this.state.group;
    return (
      <div>
        <NavBar />
        <div class="container">
          <div class="row" style={{ marginTop: "30px" }}>
            <div class="offset-md-3 col-md-6">
              <form
                action="resources/localupload"
                method="POST"
                encType="multipart/form-data"
              >
                <h1 className="h3 mb-3 font-weight-normal">Upload Video</h1>
                <div class="form-group files">
                  <div className="form-group">
                    <label>Group Name </label>
                    <select
                      className="form-control"
                      name="group"
                      id="ada"
                      onChange={this.onChangeGroup}
                      value={this.state.group}
                    >
                      {this.GroupList()}
                    </select>
                    <p>{message2}</p>
                  </div>
                  <div className="form-group">
                    <label>Video Title </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                    />
                  </div>

                  <label>Upload Your File </label>
                  <input
                    type="file"
                    name="file"
                    class="form-control"
                    multiple
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div class="form-group">
                  <ToastContainer />
                  <Progress max="100" color="success" value={this.state.loaded}>
                    {Math.round(this.state.loaded, 2)}%
                  </Progress>
                </div>
                <h3 style={{ textAlign: "center" }}> OR </h3>
                <div className="form-group">
                  <label>Add YouTube Video URL </label>
                  <input
                    type="text"
                    placeholder="ex: https://www.youtube.com/embed/yO7Q3YWzY"
                    className="form-control"
                    value={this.state.youtubelink}
                    onChange={this.onChangeYouTubeLink}
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-success btn-block"
                  onClick={this.onClickHandler}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
