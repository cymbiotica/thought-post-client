import React, { Component } from "react";
import axios from "axios";

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.post.title,
      body: this.props.post.body
    };
  }
  handleInput = e => {
    this.props.resetNotification();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBlur = () => {
    const post = {
      title: this.state.title,
      body: this.state.body
    };
    axios
      .put(`${config.apiUrl}/${this.props.post.id}`, { post: post })
      .then(response => {
        console.log(response);
        this.props.updatePost(response.data);
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div className="tile">
        <form onBlur={this.handleBlur}>
          <input
            className="input"
            name="title"
            type="text"
            placeholder="Thought Title"
            value={this.state.title}
            onChange={this.handleInput}
            ref={this.props.titleRef}
          />
        </form>
        <textarea
          className="input"
          name="body"
          placeholder="Describe your thought"
          value={this.state.body}
          onChange={this.handleInput}
        />
      </div>
    );
  }
}
