import React, { Component } from 'react';
import '../styles/App.css';
import PostsContainer from '../components/post/PostsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Thought Post</h1>
          <PostsContainer />
        </header>

      </div>
    );
  }
}

export default App;
