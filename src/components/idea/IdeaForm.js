import React, { Component } from "react";
import axios from "axios";
import onClickOutside from "react-onclickoutside";
import config from "../../config/config";

class IdeaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.idea.title,
      body: this.props.idea.body
    };
  }

  handleInput = e => {
    this.props.resetNotification();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickOutside = () => {
    const idea = { title: this.state.title, body: this.state.body };

    axios({
      method: "patch",
      url: `${config.apiUrl}/ideas/${this.props.idea.id}`,
      headers: {
        Authorization: `Token token=${this.props.userToken}`
      },
      data: {
        idea: idea
      }
    })
      .then(response => {
        // console.log(response)
        this.props.updateIdea(response.data.idea);
      })
      .then(() => {
        this.props.getPosts();
      });
  };

  render() {
    return (
      <div className="triangle-isosceles">
        {/* <form onBlur={this.handleClickOutside}> */}
        <form>
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Enter a Title"
            value={this.state.title}
            onChange={this.handleInput}
            ref={this.props.titleRef}
          />
          <textarea
            className="input"
            name="body"
            placeholder="Describe your idea"
            value={this.state.body}
            onChange={this.handleInput}
          />
        </form>
      </div>
    );
  }
}

export default onClickOutside(IdeaForm);
