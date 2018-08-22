import React, { Component } from "react";
import "../src/styles/App.css";
import IdeasContainer from "./components/idea/IdeasContainer";

import SignUp from "../src/components/auth/SignUp.js";
import SignIn from "../src/components/auth/SignIn.js";
import ChangePassword from "./components/auth/ChangePassword";
import SignOut from "./components/auth/SingOut";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null
    };
  }

  setUserToken = signInToken => {
    this.setState({
      userToken: signInToken
    });
  };
  render() {
    const componentsToShowIfSignedIn = [
      <ChangePassword userToken={this.state.userToken} />,
      <SignOut userToken={this.state.userToken} />,
      <IdeasContainer userToken={this.state.userToken} />
    ]

    const notSignedIn =[
      <SignUp />, 
      <SignIn setUserToken={this.setUserToken} />
    ]
    return (
      <div className="App">
        {this.state.userToken ? componentsToShowIfSignedIn : notSignedIn}
        <header className="App-header">
          <h1 className="App-title">Thought Post</h1>
        </header>
      </div>
    );
  }
}

export default App;
