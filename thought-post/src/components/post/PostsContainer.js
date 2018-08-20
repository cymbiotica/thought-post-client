import React, { Component } from "react";
import axios from "axios";
import Post from "./Post";
import PostForm from "./PostForm";
import update from "immutability-helper";
import Notification from "./Notification";
import config from "../../config/config";

class PostsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      editingPostId: null,
      notification: "",
      transitionIn: false
    };
  }

  componentDidMount() {
    axios
      .get(`${config.apiUrl}/posts`)
      .then(response => {
        console.log(response.data)
        // debugger
        this.setState({ posts: response.data });
      })
      .catch(error => console.log(error));
  }

  addNewPost = () => {
    axios
      .post(`${config.apiUrl}/posts`, { post: { title: "", body: "" } })
      .then(response => {
        const posts = update(this.state.posts, {
          $splice: [[0, 0, response.data]]
        });
        this.setState({ posts: posts, editingPostId: response.data.id });
      })
      .catch(error => console.log(error));
  };

  updatePost = post => {
    const postIndex = this.state.posts.findIndex(idx => idx.id === post.id);
    const posts = update(this.state.posts, {
      [postIndex]: { $set: post }
    });
    this.setState({
      posts: posts,
      notification: "Changes Saved",
      transitionIn: true
    });
  };

  deletePost = id => {
    axios
      .delete(`${config.apiUrl}/posts/${id}`)
      .then(response => {
        const postIndex = this.state.posts.findIndex(idx => idx.id === id);
        const posts = update(this.state.posts, { $splice: [[postIndex, 1]] });
        this.setState({ posts: posts });
      })
      .catch(error => console.log(error));
  };

  resetNotification = () => {
    this.setState({ notification: "", transitionIn: false });
  };

  enableEditing = id => {
    this.setState({ editingPostId: id }, () => {
      this.title.focus();
    });
  };

  render() {
    debugger
    return (
      <div>
        <div>
          <button className="newPostBtn" onClick={this.addNewPost}>
            New Post
          </button>
          <Notification
            in={this.state.transitionIn}
            notification={this.state.notification}
          />
        </div>
        {this.state.posts.map(post => {
          if (this.state.editingPostId === post.id) {
            return (
              <PostForm
                post={post}
                key={post.id}
                updatePost={this.updatePost}
                titleRef={input => (this.title = input)}
                resetNotification={this.resetNotification}
              />
            );
          } else {
            return (
              <Post
                post={post}
                key={post.id}
                onClick={this.enableEditing}
                onDelete={this.deletePost}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default PostsContainer;
