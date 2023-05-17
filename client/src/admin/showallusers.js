import React, { Component } from 'react';
import NavBar from "../components/NavBar";
import axios from 'axios';
import "./admin.css";

const divStyle = {
  display: "contents"
}

const Todo = props => (
  <div style={divStyle} >
    <tr>
      <td>{props.todo.first_name}</td>
      <td>{props.todo.last_name}</td>
      <td>{props.todo.email}</td>
      <td>{props.todo.role}</td>
      <td>
        <a href={"/allusers/edit/" + props.todo._id} className="btn btn-primary btn-info" role="button" aria-pressed="true">Edit</a>
      </td>
    </tr>
  </div>
);

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      instructors: [],
      admins: [],
      search: ''
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  componentDidMount() {
    axios.get('http://localhost:5000/students/')
      .then(response => {
        this.setState({ students: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://localhost:5000/instructors/')
      .then(response => {
        this.setState({ instructors: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get('http://localhost:5000/admins/')
      .then(response => {
        this.setState({ admins: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let filteredStudents = this.state.students.filter(
      (student) => {
        return (
          student.first_name.indexOf(this.state.search) !== -1 ||
          student.last_name.indexOf(this.state.search) !== -1 ||
          student.email.indexOf(this.state.search) !== -1
        );
      }
    );

    let filteredInstructors = this.state.instructors.filter(
      (instructor) => {
        return (
          instructor.first_name.indexOf(this.state.search) !== -1 ||
          instructor.last_name.indexOf(this.state.search) !== -1 ||
          instructor.email.indexOf(this.state.search) !== -1
        );
      }
    );

    let filteredAdmins = this.state.admins.filter(
      (admins) => {
        return (
          admins.first_name.indexOf(this.state.search) !== -1 ||
          admins.last_name.indexOf(this.state.search) !== -1 ||
          admins.email.indexOf(this.state.search) !== -1
        );
      }
    );

    return (
      <div>
        <NavBar />
        <div style={{ padding: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <a href="/users/create" className="btn btn-primary btn-info btn active" role="button" aria-pressed="true">Create Admin</a> <br />
          <h1 style={{ marginLeft: "-200px", textDecoration: "underline", color: "#F0542D" }}>Manage Users</h1>
          <input type="text" placeholder="Search..." className="form-control input-sm" style={{ width: "250px" }} value={this.state.search} onChange={this.updateSearch.bind(this)} />
        </div>

        <div className="container" style={{ border: "10px solid lightgray" }}>
          <table className="table table-striped" id="usertable" ref={el => this.el = el} data-order='[[ 1, "asc" ]]' data-page-length='25'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(function (currentStudent, i) {
                return <Todo todo={currentStudent} key={i} />;
              })}          
              {filteredInstructors.map(function (currentInstructor, i) {
                return <Todo todo={currentInstructor} key={i} />;
              })}
              {filteredAdmins.map(function (currentAdmin, i) {
                return <Todo todo={currentAdmin} key={i} />;
              })}
        </tbody>
      </table>
    </div>
  </div>
);
}
}
