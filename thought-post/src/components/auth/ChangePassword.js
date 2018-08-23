import React, { Component } from "react";
import axios from "axios";

import config from "../../config/config";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old: "",
      newPass: ""
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
        passwords: {...this.state}
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  };

  render() {
    const styles = {
      backgroundColor: "yellow",
      border: 'solid',
      width: '200px'
    }
    const { old, newPass } = this.state;
    return (
      <div style={styles}>
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
