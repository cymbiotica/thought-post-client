import React, { Component } from 'react'
import '../src/styles/App.css'
import IdeasContainer from './components/idea/IdeasContainer'

import SignUp from '../src/components/auth/SignUp.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userToken: null
    }
  }

  render() {
    return (
      <div className="App">
        <SignUp />
        <header className="App-header">
          <h1 className="App-title">Thought Post</h1>
        </header>
        <IdeasContainer />
      </div>
    );
  }
}

export default App
