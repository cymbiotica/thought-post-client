import React from 'react'
import config from '../../config/config'

import axios from 'axios'

const SignUp = props => {
  // example of handling form data in React
  const handleSignUp = e => {
    e.preventDefault()

    // create empty object to hold the data
    const formData = {}

    // iterate over each elements in the form
    // and skip any fields with no name
    // this works in this instance to not send the button itself
    for (let field of e.target.elements) {
      if (field.name === '') {
        continue
      }

      // create a new property in the formData object
      // sets key-value
      formData[field.name] = field.value
    }
    if (formData['password'] !== formData['password_confirmation']) {
      console.error('passwords do not match')
      // TODO proper error message
      return false
    }
    delete formData['confirm-password']

    axios
      .post(`${config.apiUrl}/sign-up`, { credentials: formData })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const styles = {
    backgroundColor: "green",
    border: 'solid',
    width: "200px",
    height: "150px"
  }
  return (
    <div style={styles}> Sign Up
      <form id="sign-up-form" onSubmit={handleSignUp}>
        <input type="text" 
          name="email" 
          placeholder="Email" />
        <input type="password" 
          name="password" 
          placeholder="Password" />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
