import React, { Component } from "react";
import axios from "axios";

export default class ResetPasswordToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      resetToken: "",
      error: null,
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    this.setState({ resetToken: token });
  }

  onChangeNewPassword = (e) => {
    this.setState({ newPassword: e.target.value });
  };

  onChangeConfirmPassword = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword, resetToken } = this.state;

    // Validate if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      this.setState({ error: "Password mismatch" });
      return;
    }

    // Send a request to the server to reset the password
    axios
      .post("https://studybuddypakistan.herokuapp.com/reset-password", {
        resetToken,
        newPassword,
      })
      .then((res) => {
        console.log(res.data);
        // Handle success response
      })
      .catch((err) => {
        console.error(err);
        // Handle error response
        if (err.response && err.response.data) {
          this.setState({ error: err.response.data.error });
        } else {
          this.setState({ error: "An error occurred" });
        }
      });
  };

  render() {
    const { newPassword, confirmPassword, resetToken, error } = this.state;

    return (
      <div className="auth-wrapper">
        <div className="auth-content container">
          <div className="card">
            <div className="card-body">
              <h4 className="mb-3 f-w-400">Enter Reset Token</h4>
              <form onSubmit={this.onSubmit}>
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="feather icon-hash" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reset token"
                    value={resetToken}
                  />
                </div>
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="feather icon-lock" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New password"
                    value={newPassword}
                    onChange={this.onChangeNewPassword}
                  />
                </div>
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="feather icon-lock" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={this.onChangeConfirmPassword}
                  />
                </div>
                {error && <div className="text-danger mb-4">{error}</div>}
                <button type="submit" className="btn btn-primary shadow-2 mb-4">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
