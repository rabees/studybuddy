import React, { Component } from "react";
import "./style.css";
import axios from "axios";

export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  onChange = (e) => {
    this.setState({ email: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email } = this.state;

    // Send a request to the server for resetting the password
    axios
    .post("http://localhost:5000/reset-password", { email })
    .then((res) => {
      const { resetToken } = res.data;
      console.log(res.data);
      // Redirect the user to enter the reset token
      window.location.href = `/reset-password/${resetToken}`;
    })
    .catch((err) => {
      console.error(err);
      // Handle error response
    });
  };

  render() {
    const { email } = this.state;

    return (
      <div className="auth-wrapper">
        <div className="auth-content container">
          <div className="card">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="card-body">
                  <div className="logoHead">
                    <img
                      src="/assets/img/logo/logonew.png"
                      alt=""
                      height="60px"
                      width="60px"
                      className="sticky-logo img-fluid"
                    />
                    <h3>Study Buddy</h3>
                  </div>
                  <h4 className="mb-3 f-w-400">Reset your password</h4>
                  <form onSubmit={this.onSubmit}>
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="feather icon-mail" />
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email address"
                        value={email}
                        onChange={this.onChange}
                      />
                    </div>
                    <button className="btn btn-primary shadow-2 mb-4" onClick={this.onSubmit}>
                      Reset password
                    </button>
                  </form>
                  <p className="mb-0 text-muted">
                    Don’t have an account?{" "}
                    <a
                      href={`${process.env.PUBLIC_URL}/register`}
                      className="f-w-400"
                    >
                      Signup
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-md-6 d-none d-md-block">
                <img
                  src="../assets/img/login_banner.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
