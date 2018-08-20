import React, { Component } from "react";

class Post extends Component {
  handleClick = () => {
    this.props.onClick(this.props.post.id);
  };
  handleDelete = () => {
    this.props.onDelete(this.props.post.id);
  };

  render() {
    return (
      <div className="title">
        <span className="deleteBtn" onClick={this.handleDelete}>
          X
        </span>
        <h4 onClick={this.handleClick}>{this.props.post.title} </h4>
        <p onClick={this.handleClick}>{this.props.post.body}</p>
      </div>
    );
  }
}
export default Post
