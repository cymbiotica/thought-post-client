import React, { Component } from "react";
import axios from "axios";
import Idea from "./Idea";
import IdeaForm from "./IdeaForm";
import update from "immutability-helper";
import Notification from "./Notification";
import config from "../../config/config";

class IdeasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      editingIdeaId: null,
      notification: "",
      transitionIn: false
    };
  }

  componentDidMount() {
    axios
      .get(`${config.apiUrl}/ideas`)
      .then(response => {
        this.setState({ ideas: response.data.ideas });
      })
      .catch(error => console.log(error));
  }

  addNewIdea = () => {
    axios
      .post(`${config.apiUrl}/ideas`, { idea: { title: "", body: "" } })
      .then(response => {
        const ideas = update(this.state.ideas, {
          $splice: [[0, 0, response.data]]
        });
        this.setState({ ideas: ideas, editingIdeaId: response.data.id });
      })
      .catch(error => console.log(error));
  };

  updateIdea = idea => {
    const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id);
    const ideas = update(this.state.ideas, { [ideaIndex]: { $set: idea } });
    this.setState({
      ideas: ideas,
      notification: "All changes saved",
      transitionIn: true
    });
  };

  deleteIdea = id => {
    axios
      .delete(`${config.apiUrl}/ideas/${id}`)
      .then(response => {
        const ideaIndex = this.state.ideas.findIndex(x => x.id === id);
        const ideas = update(this.state.ideas, { $splice: [[ideaIndex, 1]] });
        this.setState({ ideas: ideas });
      })
      .catch(error => console.log(error));
  };

  resetNotification = () => {
    this.setState({ notification: "", transitionIn: false });
  };

  enableEditing = id => {
    this.setState({ editingIdeaId: id }, () => {
      this.title.focus();
    });
  };

  render() {
    // debugger
    return (
      <div>
        <div>
          <button className="newIdeaButton" onClick={this.addNewIdea}>
            New Idea
          </button>
          <Notification
            in={this.state.transitionIn}
            notification={this.state.notification}
          />
        </div>
        {this.state.ideas.map((idea, idx) => {
          if (this.state.editingIdeaId === idea.id) {
            return (
              <IdeaForm
                idea={idea}
                key={idx}
                updateIdea={this.updateIdea}
                titleRef={input => (this.title = input)}
                resetNotification={this.resetNotification}
              />
            );
          } else {
            return (
              <Idea
                idea={idea}
                key={idea.id}
                onClick={this.enableEditing}
                onDelete={this.deleteIdea}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default IdeasContainer;