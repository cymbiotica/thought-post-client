import React, { Component } from 'react'
import '../src/styles/App.css'
import IdeasContainer from './components/idea/IdeasContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Thought Post</h1>
        </header>
        <IdeasContainer />
      </div>
    );
  }
}

export default App
