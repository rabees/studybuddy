import React, { Component } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowStudent = props => (
  <option selected="selected" key={props.todo.email} value={props.todo.email}>
    {props.todo.email}
  </option>
);

const ShowGroup = props => (
  <option key={props.todo.groupName} value={props.todo.groupName}>
    {props.todo.groupName}
  </option>
);
export default class CreateEnroll extends Component {
  constructor(props) {
    super(props);

    /** Setting the initial state of the component by assigned an object to this.state **/
    this.state = {
      Student: [],
      Group: []
    };

    /** Ensure to bind our methods to this by adding them here **/

    this.onChangeGroup = this.onChangeGroup.bind(this);
    this.onChangeStudent = this.onChangeStudent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/groups/")
      .then(response => {
        this.setState({ Group: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/students/")
      .then(response => {
        this.setState({ Student: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  GroupList() {
    return this.state.Group.map(function(currentTodo, i) {
      //  console.log(currentTodo.categoryName)
      return <ShowGroup todo={currentTodo} key={i} />;
    });
  }

  StudentList() {
    return this.state.Student.map(function(currentTodo, i) {
      //  console.log(currentTodo.categoryName)
      return <ShowStudent todo={currentTodo} key={i} />;
    });
  }

  onChangeGroup(e) {
    this.setState({
      group: e.target.value
    });
  }

  onChangeStudent(e) {
    this.setState({
      student: e.target.value
    });
  }

  /** Method to handle the submit event of the form **/
  onSubmit(e) {
    e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

    console.log(`Form submitted:`);

    console.log(`Todo group: ${this.state.group}`);
    console.log(`Todo student: ${this.state.student}`);

    const newTodo = {
      student: this.state.student,
      group: this.state.group,
      todo_completed: this.state.todo_completed
    };

    axios.post("http://localhost:5000/enroll/add/", newTodo).then(result => {
      this.props.history.push("/EnrollmentList/");
    });

    // Reset the Values.
    this.setState({
      student: "",
      group: "",
      todo_completed: false
    });
  }

  // JSX code which is needed to display the form
  render() {
    // eslint-disable-next-line
    var message = "You selected " + this.state.group;
    // eslint-disable-next-line
    var message2 = "you have selected " + this.state.student;
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form onSubmit={this.onSubmit}>
                <Link to="/EnrollmentList" className="btn btn-light">Go Back</Link>
                            <br/>
                            <br/>
                <h1
                  className="h3 mb-3 font-weight-bold"
                  style={{ textDecoration: "underline" }}
                >
                  Create New Student
                </h1>
                <br />

                <div>
                  <label>Student email: </label>
                  <br />

                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid lightgray",
                      borderRadius: "5px"
                    }}
                    name="student"
                    id="ada"
                    onChange={this.onChangeStudent}
                    value={this.state.student}
                  >
                    {this.StudentList()}
                    {/* <option value="Data Structures">DS</option> */}
                  </select>
                </div>

                <div>
                  <br />

                  <label>Group: </label>
                  <br />

                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid lightgray",
                      borderRadius: "5px"
                    }}
                    name="group"
                    id="ada2"
                    onChange={this.onChangeGroup}
                    value={this.state.group}
                    defaultValue={this.state.group}
                  >
                    {this.GroupList()}
                  </select>
                </div>

                <br />
                <button
                  type="submit"
                  value="Add Student"
                  className="btn btn-lg btn-info btn-block"
                >
                  Add Enrollment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
