import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import axios from "axios";

// import Login from "./auth/LoginAdmin";
import RegisterInstructor from "./auth/RegisterInstructor";
import RegisterStudent from "./auth/RegisterStudent";
import RegisterAdmin from "./auth/RegisterAdmin";
import UserList from "./admin/showallusers";
import CreateUser from "./admin/createuser";
import EditUser from "./admin/edituser";
import ShowCategoryList from "./admin/ShowCategoryAdmin";
import ShowGroupList from "./admin/showGroupAdmin";
import EditGroupList from "./admin/editGroupAdmin";
import CreateCategoryAdmin from "./admin/createCategoryAdmin";
import EditCategoryList from "./admin/editCategoryAdmin";
import EnrollmentList from "./admin/showEnrollAdmin";
import Dashboard from "./admin/Dashboard";
import CreateEnrollAdmin from "./admin/createEnrollAdmin";
import Forgot from "./auth/Forgot";
import HomeTwo from "./HomeTwo";
import About from "./pages/About";
import Services from "./service/Services";
import ServicesForInstructor from "./service/ServicesByInstructor";
import Servicesforstudent from "./service/ServiceforStudent"
import AddGroup from "./blog/AddGroup";
import AddResource from "./blog/Addresource";
import BlogDetailsLeftSidebar from "./blog/BlogDetailsLeftSidebar";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/404";
import NoMAtch from "./pages/404";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import PrivateRoute from "./components/common/PrivateRoute";

//actions
import { setCurrentUser, logoutUser } from "./actions/authActions";

//profile stuff
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profile from "./components/profile/Profile";
import FinalDashboard from "./components/FinalDashboard";
import FinalProfiles from "./components/FinalProfiles";

//posts stuff
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import EditPost from "./components/post/EditPost";

//schedule stuff
import Schedule from "./components/schedule/Schedule";
import ScheduleForm from "./components/schedule/ScheduleForm";
import ISchedule from "./components/schedule/ISchedule";
import IScheduleForm from "./components/schedule/IScheduleForm";
import Payment from "./components/payment/Payment";
import LoginAdmin from "./auth/LoginAdmin";
import LoginInstructor from "./auth/LoginInstructor";
import LoginStudent from "./auth/LoginStudent";
import ResetPasswordToken from "./auth/ResetPasswordToken";

//check for token to avoid state destroy on reload
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and export default
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isauthenticated
  //we can call any action using below method
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    //Redirect to login
    window.location.href = "/login/student";
  }
}

const stripePromise = loadStripe("pk_test_51L2DnCDu7chjgqDrDYFLDrpKGjVrSdlpvJWzNeuntWx6KfA9bqL4sd1XCwOLflqtQBEQae6Z6TAkaFERcOXy4dqy00tMGsgyBJ");

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    try {
      const url = `http://localhost:5000/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      this.setState({ user: data.user._json });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={"/"}>
          <Switch>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              component={HomeTwo}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/home-two`}
              component={HomeTwo}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/about-us`}
              component={About}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/servicesforstudent/:id`}
              component={Servicesforstudent}
            />
             <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/services/:id`}
              component={ServicesForInstructor}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/services`}
              component={Services}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/addgroup/:id`}
              component={AddGroup}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/:id`}
              component={BlogDetailsLeftSidebar}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/contact-us`}
              component={Contact}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login/admin`}
              component={LoginAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login/student`}
              component={LoginStudent}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login/instructor`}
              component={LoginInstructor}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register/student`}
              component={RegisterStudent}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register/instructor`}
              component={RegisterInstructor}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register/admin`}
              component={RegisterAdmin}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/allusers`}
              component={UserList}
            />
             <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/users/create`}
              component={CreateUser}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/allusers/edit/:id`}
              component={EditUser}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/dashboard`}
              component={Dashboard}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/createEnrollAdmin`}
              component={CreateEnrollAdmin}
            />
             <Route
              exact
              path={`${process.env.PUBLIC_URL}/EnrollmentList`}
              component={EnrollmentList}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ShowGroupList`}
              component={ShowGroupList}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ShowCategoryList`}
              component={ShowCategoryList}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ShowGroupList/edit/:id`}
              component={EditGroupList}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ShowCategoryList/edit/:id`}
              component={EditCategoryList}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/CreateCategoryAdmin`}
              component={CreateCategoryAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/forgot-password`}
              component={Forgot}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/reset-password/:resetToken`}
              component={ResetPasswordToken}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/add-resource/:id`}
              component={AddResource}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/404`}
              component={PageNotFound}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/finaldashboard`}
              component={FinalDashboard}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/create-profile`}
              component={CreateProfile}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/edit-profile`}
              component={EditProfile}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/add-experience`}
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/add-education`}
              component={AddEducation}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/finalprofiles`}
              component={FinalProfiles}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/feed`}
              component={Posts}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/post/:id`}
              component={Post}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/posts/edit/:id`}
              component={EditPost}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/profile/:handle`}
              component={Profile}
            />
            <Route 
              exact
              path={`${process.env.PUBLIC_URL}/schedule`} // for student
              component={Schedule} 
            />
            <PrivateRoute 
              exact
              path={`${process.env.PUBLIC_URL}/ischedule`} // for instructor
              component={ISchedule} 
            />
            <PrivateRoute 
              exact
              path={`${process.env.PUBLIC_URL}/schedule/book`} // for student
              component={ScheduleForm} 
            />
            <Route 
              exact
              path={`${process.env.PUBLIC_URL}/ischedule/book`} // for student
              component={IScheduleForm} 
            />
            <Elements stripe={stripePromise}>
            <PrivateRoute 
              exact
              path={`${process.env.PUBLIC_URL}/payment`} 
              component={Payment} 
            />
            </Elements>
            <PrivateRoute component={NoMAtch} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.register();
