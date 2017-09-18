import React, { Component } from 'react';
import './Post.css';
import moment from "moment";

class Post extends Component {

  constructor () {
    super()
    this.state = {
      actionsOpen: false,
      isAuthored: true
    }
  }

  postDate () {
    const postMoment = moment(this.props.post.created, 'x')
    const date = moment(this.now)
    const daysSince = date.diff(postMoment, 'days')
    const hoursSince = date.diff(postMoment, 'hours')
    const minutesSince = date.diff(postMoment, 'minutes')

    let postDate
    if (daysSince > 0) {
      postDate = `${daysSince} day${daysSince > 1 ? 's' : ''} ago`
    } else if (hoursSince > 0) {
      postDate = `${hoursSince} hour${hoursSince > 1 ? 's' : ''} ago`
    } else if (minutesSince > 0) {
      postDate = `${minutesSince} minute${minutesSince > 1 ? 's' : ''} ago`
    } else {
      postDate = 'a moment ago'
    }

    return postDate
  }

  toggleActions = () => {
    this.setState((prevState) => ({
      actionsOpen: !prevState.actionsOpen
    }))
  }

  edit = () => {
    if (this.props.onEdit) {
      this.props.onEdit(this.props.post);
    }
  }

  remove = () => {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.post);
    }
  }

  reply = () => {
    if (this.props.onReply) {
      this.props.onReply(this.props.post);
    }
  }

  renderActionsMenu(shouldRender, isAuthor) {
    return shouldRender &&
      <div className="Post-actionsMenu">
        {this.renderActions(isAuthor)}
      </div>
  }

  renderActions(isAuthored) {
    if (isAuthored) {
      return <span>
        <button className="Post-action" onClick={this.edit}>
          <i aria-hidden="true" className="fa fa-pencil"/>
          <span>Edit</span>
        </button>
        <button className="Post-action" onClick={this.remove}>
          <i aria-hidden="true" className="fa fa-trash-o"/>
           <span>Delete</span>
        </button>
      </span>
    } else {
      return <button className="Post-action" onClick={this.reply}>
        <i aria-hidden="true" className="fa fa-reply"/>
        <span>Reply</span>
      </button>
    }
  }

  render() {
    const {state} = this
    const {post} = this.props
    return (
      <div className="Post">
        <div className="Post-header">
          Posted by {post.author} {this.postDate()}
        </div>
        <h3 className="Post-title">{post.title}</h3>
        <p className="Post-message">{post.message}</p>
        <div className="Post-actions">
          <button className={`Post-actionsToggle ${state.actionsOpen ? 'isOpen' : ''}`} onClick={this.toggleActions}>
            <i className="fa fa-ellipsis-h" aria-hidden="true" />
          </button>
          {this.renderActionsMenu(state.actionsOpen, state.isAuthored)}
        </div>
      </div>
    );
  }
}

export default Post;
