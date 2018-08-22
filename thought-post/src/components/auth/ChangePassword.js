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
    const { old, newPass } = this.state;
    // req obj is passwords: {old:, new:}
    // axios.patch(`${config.apiUrl}/change-password`, { passwords: {old, newPass} })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
    // console.log(this.props)
    axios({
      method: "patch",
      url: `${config.apiUrl}/change-password`,
      headers: {
        Authorization: `Token token=${this.props.userToken}`
      },
      data: {
        passwords: {
          old: old,
          newPass: newPass
        }
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  };

  render() {
    const { old, newPass } = this.state;
    return (
      <div>
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
