import React, { Component } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
// import ShowCategory from './ShowCategory';

const ShowCat = props => (
  <option key={props.todo._id} value={props.todo.categoryName}>
    {props.todo.categoryName}
  </option>
);
export default class AddGroup extends Component {
  constructor(props) {
    super(props);

    /** Setting the initial state of the component by assigned an object to this.state **/
    this.state = {
      groupName: "",
      groupDescription: "",
      instructor: this.props.match.params.id,
      category: "",
      todos: []
    };
    this.onChangeGroupName = this.onChangeGroupName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    //to get data from mongo link
    axios
      .get("http://localhost:5000/categories/")
      .then(response => {
        // console.log(response.data);
        this.setState({
          todos: response.data,
          category: response.data[0].categoryName
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  CatList() {
    return this.state.todos.map(function(currentTodo, i) {
      //  console.log(currentTodo.categoryName)
      return <ShowCat todo={currentTodo} key={i} />;
    });
  }

  onChangeGroupName(e) {
    this.setState({
      groupName: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      groupDescription: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

    console.log(`Form submitted:`);
    console.log(`Todo name: ${this.state.groupName}`);
    console.log(`Todo description: ${this.state.groupDescription}`);
    console.log(`Todo instructor: ${this.state.instructor}`);
    console.log(`Todo category: ${this.state.category}`);

    const newTodo = {
      groupName: this.state.groupName,
      groupDescription: this.state.groupDescription,
      instructor: this.props.match.params.id,
      category: this.state.category
      // todo_completed: this.state.todo_completed
    };
    axios
      .post("http://localhost:5000/group/add", newTodo)

      .then(result => {
        this.props.history.push("/add-resource/" + this.props.match.params.id);
      });
  }
  render() {
    var message = "You selected " + this.state.category;
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Add Group</h1>
                <div className="form-group">
                  <label>Group Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="groupname"
                    placeholder="Enter Group name"
                    value={this.state.groupName}
                    onChange={this.onChangeGroupName}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Enter Description"
                    value={this.state.groupDescription}
                    onChange={this.onChangeDescription}
                  />
                </div>
                <div>
                  <label>Group Category</label>
                  <br />

                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid lightgray",
                      borderRadius: "5px"
                    }}
                    name="category"
                    id="ada"
                    onChange={this.onChangeCategory}
                    value={this.state.category}
                  >
                    {this.CatList()}
                    {/* <option value="Data Structures">DS</option> */}
                  </select>
                </div>
                <p>{message}</p>
                <br />
                <button
                  type="submit"
                  value="add group"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Add Group
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
