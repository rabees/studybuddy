import React, { Component } from 'react';
import Navbar from "../components/NavBar";
import axios from 'axios';

const ShowRole = props => (
  <option key={props.todo.name} value={props.todo.name}>{props.todo.name}</option>
);

export default class UserEdit extends Component {
    constructor(props) {
        super(props);
        // initialize the state with an empty todos array
        this.state = {todos: [],
        Roles:[]}
    }

    // To retrieve the todos data from the database --> use the componentDidMount lifecycle method
    componentDidMount() {
      const id = this.props.match.params.id;
    
      axios.get(`https://studybuddypakistan.herokuapp.com/student?id=${id}`)
        .then(response => {
          if (response.data) {
            this.setState({ todos: response.data });
            return;
          }
          
          axios.get(`https://studybuddypakistan.herokuapp.com/instructor?id=${id}`)
            .then(response => {
              if (response.data) {
                this.setState({ todos: response.data });
                return;
              }
              
              axios.get(`https://studybuddypakistan.herokuapp.com/admin?id=${id}`)
                .then(response => {
                  if (response.data) {
                    this.setState({ todos: response.data });
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    
      axios.get('https://studybuddypakistan.herokuapp.com/showroles/')
        .then(response => {
          this.setState({ Roles: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
    

    RoleList() {
      return this.state.Roles.map(function(currentTodo, i){
          //  console.log(currentTodo.categoryName)
          return <ShowRole todo={currentTodo} key={i} />;

      })
  }
    onChange = (e) => {
        const state = this.state.todos
        state[e.target.name] = e.target.value;
        this.setState({todos:state});
      }
    
      toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    
      delete(id) {
        console.log(id);
        const userId = this.props.match.params.id;
      
        axios.delete(`https://studybuddypakistan.herokuapp.com/student?id=${userId}`)
          .then((result) => {
            if (result.data) {
              this.props.history.push("/allusers/");
              return;
            }
      
            axios.delete(`https://studybuddypakistan.herokuapp.com/instructor?id=${userId}`)
              .then((result) => {
                if (result.data) {
                  this.props.history.push("/allusers/");
                  return;
                }
      
                axios.delete(`https://studybuddypakistan.herokuapp.com/admin?id=${userId}`)
                  .then((result) => {
                    if (result.data) {
                      this.props.history.push("/allusers/");
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      }

    handleChange(e) {
      var whoIsChecked = {...this.state.whoIsChecked}
      whoIsChecked.allowDestroyAll = e.target.value
      this.setState({whoIsChecked}, ()=> {console.log(this.state)})
      
 }

 onSubmit = (e) => {
  e.preventDefault();

  const id = this.props.match.params.id;
  const { first_name, last_name, email, password, role } = this.state.todos;
  console.log(this.state.todos);

  axios.put(`https://studybuddypakistan.herokuapp.com/student?id=${id}`, { first_name, last_name, email, password, role })
    .then((result) => {
      if (result.data) {
        this.props.history.push("/allusers/");
        return;
      }
      
      axios.put(`https://studybuddypakistan.herokuapp.com/instructor?id=${id}`, { first_name, last_name, email, password, role })
        .then((result) => {
          if (result.data) {
            this.props.history.push("/allusers/");
            return;
          }
          
          axios.put(`https://studybuddypakistan.herokuapp.com/admin?id=${id}`, { first_name, last_name, email, password, role })
            .then((result) => {
              if (result.data) {
                this.props.history.push("/allusers/");
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
}
  
    render() {
      // const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
      var message='You selected '+this.state.todos.role
      return (
        <div>
          <Navbar/>
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <br/>
              <h3 class="panel-title">
                EDIT User
              </h3>
            </div>
            <div class="panel-body">
             
              <br/>
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="First Name">FirstName:</label>
                  <input type="text" class="form-control" name="first_name" value={this.state.todos.first_name} onChange={this.onChange} placeholder="first name" />
                </div>
                <div class="form-group">
                  <label for="Last Name">LastName:</label>
                  <input type="text" class="form-control" name="last_name" value={this.state.todos.last_name} onChange={this.onChange} placeholder="last name" />
                </div>
                <div class="form-group">
                  <label for="Email">Email:</label>
                  <input type="text" class="form-control" name="email" value={this.state.todos.email} onChange={this.onChange} placeholder="email" />
                </div>
                <div class="form-group">
                  <label for="Password">Password:</label>
                  <input type="password" class="form-control" name="password" value={this.state.todos.password} onChange={this.onChange} placeholder="password" />
                </div>
                <div>
                <label>Role</label>
                <select 
                            className="form-control" name="role"
                            id="ada"
                            onChange={this.onChange}
                            value={this.state.todos.role} 
                            >
                            {this.RoleList()}
                            </select>
                            <p>{message}</p>
                            </div>
                {/* <select 
                className="form-control" name="role"
                id="ada" 
                onChange={this.onChange}
                value={this.state.todos.role}>
                    <option value="admin">admin</option>
                    <option value="instructor">instructor</option>
                    <option value="student">student</option>
                </select> */}
                <br/>
                <button type="submit" class="btn btn-dark">Update</button> &nbsp;
                <button onClick={this.delete.bind(this, this.state.todos._id)} class="btn btn-danger">Delete</button>
               </form>
            </div>
          </div>
        </div>
        </div>
      );
    }
  }