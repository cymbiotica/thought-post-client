import React, { Component } from 'react'
import axios from 'axios'

import config from '../../config/config'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email:'',
      password:''
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSignIn = (e) => {
    e.preventDefault()
    axios.post(`${config.apiUrl}/sign-in`, {credentials:{ ...this.state }})
    .then(res => this.props.setUserToken(res.data.user.token))
    // .then(res => console.log(res.data))
    
    .catch(err => console.log(err))
  }

  render() {
    const styles = {
      backgroundColor: "purple",
      border: 'solid',
      width: '200px'
    }
    const { email, password } = this.state
    return (
      <div style={styles}> Sign In 
        <form onSubmit={this.handleSignIn}>
          <input type="text" 
            name="email" 
            placeholder="Email" 
            value={email} 
            onChange={this.handleChange} />
          <input type="password" 
            name="password" 
              placeholder="Password" 
              value={password} 
              onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default SignIn
