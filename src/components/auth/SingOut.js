import React, { Component } from "react";
import config from "../../config/config";

import axios from "axios";

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSignOut = e => {
    e.preventDefault();

    axios
      .delete(`${config.apiUrl}/sign-out`, {
        headers: {
          Authorization: `Token token=${this.props.userToken}`
        }
      })
      .then(() => this.props.setUserToken(null));
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignOut}>
          <div>
            <button className="newIdeaButton" type="submit">
              Sign Out
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default SignOut;
