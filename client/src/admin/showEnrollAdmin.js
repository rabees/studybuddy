import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
import "./admin.css";

export default class EnrollList extends Component {
  constructor(props) {
    super(props);
    // initialize the state with an empty todos array
    this.state = { todos: [], search: "" };
    this.refreshEnrollList = this.refreshEnrollList.bind(this);
  }

  //for searching event in page
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  // To retrieve the todos data from the database --> use the componentDidMount lifecycle method
  componentDidMount() {
    //to get data from mongo link
    axios
      .get("https://studybuddypakistan.herokuapp.com/enrollments/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  delete(id) {
    console.log(id);
    axios
      .delete("https://studybuddypakistan.herokuapp.com/enrollment?id=" + id)
      .then(result => {
        // this.forceUpdate()

        toast.success("Deleted successfully");
        // this.props.history.push("/showenroll/")
      })
      .catch(err => {
        // then print response status
        toast.error("Group not deleted");
      });

      setTimeout(() => {
        window.location.reload();
      }, 1300);      
  }

  refreshEnrollList = res => this.setState({ todos: res.data.todos });
  render() {
    const divStyle = {
      display: "contents"
    };
    // var message='You selected '+this.state.todos._id
    const Todo = props => (
      <div style={divStyle}>
        <tr>
          <td>{props.todo.student ? props.todo.student.email : ""}</td>
          <td>{props.todo.group ? props.todo.group.groupName : ""}</td>
          <td>
            {/* <Link to={"users/edit/"+props.todo._id}>Edit</Link> */}
            {/* <button className="button muted-button" class="btn btn-success"><Link to={"allusers/edit/"+props.todo._id} role="button" aria-pressed="true">Edit</Link></button> */}
            {/* <a href={"showgroups/edit/"+props.todo._id} class="btn btn-primary btn active" role="button" aria-pressed="true">Delete</a> */}
            {/* <link to='' refresh="true"> */}
            <button
              onClick={this.delete.bind(this, props.todo._id)}
              class="btn btn-danger"
            >
              Delete
            </button>
            {/* <p>{message}</p> */}
          </td>
        </tr>
      </div>
    );
    //used in filtering the content coming from database mongo
    let filteredusers = this.state.todos.filter(enroll => {
      return (
        enroll.student.email.indexOf(this.state.search) !== -1 ||
        enroll.group.groupName.indexOf(this.state.search) !== -1
      );
    });
    return (
      <div>
        <NavBar />

        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          {/* <a
            href="/createEnrollAdmin"
            className="btn btn-primary btn-info btn active"
            role="button"
            aria-pressed="true"
          >
            Create Enrollment
          </a>{" "} */}
          <br />
          <h1
            style={{
              marginLeft: "160px",
              textDecoration: "underline",
              color: "#F0542D"
            }}
          >
            Enrollment List
          </h1>
          <input
            type="text"
            placeholder="Search..."
            class="form-control input-sm"
            style={{ width: "250px" }}
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>

        <div className="container" style={{ border: "10px solid lightgray" }}>
          <table
            className="table table-striped"
            id="usertable"
            ref={el => (this.el = el)}
            data-order='[[ 1, "asc" ]]'
            data-page-length="25"
          >
            <thead>
              <tr>
                <th>Student Email</th>
                <th>Group Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* displaying data coming  */}
              {filteredusers.map((currentTodo, i) => {
                return <Todo todo={currentTodo} key={i} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
