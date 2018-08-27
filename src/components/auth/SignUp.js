import React, { Component } from "react";
import config from "../../config/config";
import Notification from "../idea/Notification";

import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: "",
      transitionIn: false
    };
  }

  handleSignUp = e => {
    e.preventDefault();
    const formData = {};

    for (let field of e.target.elements) {
      if (field.name === "") {
        continue;
      }

      formData[field.name] = field.value;
    }
    if (formData["password"] !== formData["password_confirmation"]) {
      this.setState({
        notification: `Passwords do not match.`,
        transitionIn: true
      });
      return false;
    }
    delete formData["confirm-password"];

    axios
      .post(`${config.apiUrl}/sign-up`, { credentials: formData })
      .then(res => {
        this.setState({
          notification: `Signed up successfully.`,
          transitionIn: true
        });
      })
      .catch(error => {
        this.setState({
          notification: `${error}`,
          transitionIn: true
        });
      });
  };
  render() {
    const styles = {
      backgroundColor: "green",
      border: "solid",
      width: "200px"
    };
    return (
      <div style={styles}>
        <div>
          <Notification
            in={this.state.transitionIn}
            notification={this.state.notification}
          />
          </div>
        Sign Up
        <form id="sign-up-form" onSubmit={this.handleSignUp}>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default SignUp;
