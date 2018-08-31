import React, { Component } from 'react'

class Idea extends Component {
	handleClick = () => { this.props.onClick(this.props.idea.id) }

	handleDelete = () => { this.props.onDelete(this.props.idea.id) }

	render () {
		const canEdit = [
			<span className="deleteButton" onClick={this.handleDelete}>X</span>,
			<h4 onClick={this.handleClick}>{this.props.idea.title}</h4>,
			<p onClick={this.handleClick}>{this.props.idea.body}</p>
		]
		const noEdit = [
			<span></span>,
			<h4>{this.props.idea.title}</h4>,
			<p>{this.props.idea.body}</p>
		]

		return(
		  <div className="tile">
				{
					(this.props.userId !== this.props.idea.user_id) 
					? noEdit
					: canEdit
				}
		  </div>
		)
	}
}

export default Idea
