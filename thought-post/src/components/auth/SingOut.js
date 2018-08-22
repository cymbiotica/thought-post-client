import React, { Component } from "react";
import config from '../../config/config'

import axios from 'axios'

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSignOut = e => {
    e.preventDefault()

    axios.delete(`${config.apiUrl}/sign-out`, {
       headers: { 
         Authorization: `Token token=${this.props.userToken}` 
        }
    })
      .then(res => console.log(res))
      .catch(err => console.err(err))
  }

render() {
  return (
    <div>
      <form onSubmit={this.handleSignOut}>
      <button type="submit">Sign Out</button>
      </form>
    </div>
  )
}
}
export default SignOut
