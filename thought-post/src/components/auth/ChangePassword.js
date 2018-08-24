import React, { Component } from "react";
import axios from "axios";

import config from "../../config/config";
import Notification from "../idea/Notification";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old: "",
      newPass: "",
      notification: "",
      transitionIn: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangePassword = e => {
    e.preventDefault();
    axios({
      method: "patch",
      url: `${config.apiUrl}/change-password`,
      headers: {
        Authorization: `Token token=${this.props.userToken}`
      },
      data: {
        passwords: { ...this.state }
      }
    })
      .then(res => {
        this.setState({
          notification: `Changed password successfully.`,
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
      backgroundColor: "rgb(2, 73, 2)",
      color: "yellowgreen",
      width: "200px",
      height: "100px"
    };
    const { old, newPass } = this.state;
    return (
      <div style={styles}>
        <div>
          <Notification
            in={this.state.transitionIn}
            notification={this.state.notification}
          />
        </div>
        Password Change
        <form onSubmit={this.handleChangePassword}>
          <input
            type="password"
            name="old"
            placeholder="Password"
            value={old}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="newPass"
            placeholder="Password"
            value={newPass}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
