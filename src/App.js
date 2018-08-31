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
      userToken: null,
      userId: null
    };
  }

  setUser = (signInToken, signInId) => {
    this.setState({
      userToken: signInToken,
      userId: signInId
    });
  };

  setUserToken = signInToken => {
    this.setState({
      userToken: signInToken
    });
  };

  render() {
    const componentsToShowIfSignedIn = [
      <ChangePassword userToken={this.state.userToken} key={0} />,
      <SignOut
        userToken={this.state.userToken}
        setUserToken={this.setUserToken}
        key={1}
      />,
      <IdeasContainer 
        userToken={this.state.userToken} 
        userId={this.state.userId}
        key={2} 
        />
    ];

    const notSignedIn = [
      <SignUp key={0} />,
      <SignIn
        setUser={this.setUser}
        key={1} 
        />
    ];

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Thought Post</h1>
        </header>
        <div style={{ display: "flex" }}>
          {this.state.userToken ? componentsToShowIfSignedIn : notSignedIn}
        </div>
      </div>
    );
  }
}

export default App;
