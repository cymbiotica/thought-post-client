import React, { Component } from "react";
import axios from "axios";

import config from "../../config/config";
import Notification from "../idea/Notification";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      notification: "",
      transitionIn: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSignIn = e => {
    e.preventDefault();
    axios
      .post(`${config.apiUrl}/sign-in`, { credentials: { ...this.state } })
      .then(res => {
        this.props.setUser(res.data.user.token, res.data.user.id)
      })
      .catch(error => {
        this.setState({
          notification: `sign in failed`,
          transitionIn: true
        });
      });
  };

  render() {
    const styles = {
      backgroundColor: "purple",
      border: "solid",
      width: "200px"
    };
    const { email, password } = this.state;
    return (
      <div style={styles}>
        <div>
          <Notification
            in={this.state.transitionIn}
            notification={this.state.notification}
          />
        </div>
        Sign In
        <form onSubmit={this.handleSignIn}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
