import React, { Component } from 'react'
import './Bulletin.css'
import Post from "../Post/Post"
import BulletinModel from "../../models/Bulletin.model";
import BulletinService from "../../services/Bulletin.service";

class Bulletin extends Component {

  static filterPosts (posts) {
    return posts.sort((a, b) => {
      if (a.created < b.created) {
        return 1
      }
      if (a.created > b.created) {
        return -1
      }
      return 0
    })
      .filter((post, index) => {
        return index < 10
      })
  }

  constructor () {
    super()
    this.state = {
      loading: true,
      bulletin: new BulletinModel()
    }
  }

  componentWillMount () {
    this.loadBulletin()
  }

  loadBulletin () {
    this.setState({loading: true})
    return BulletinService.list()
      .then(bulletin => this.setState({bulletin}))
      .then(() => this.setState((prevState) => {
        prevState.bulletin.posts = Bulletin.filterPosts(prevState.bulletin.posts)
      }))
      .catch(error => this.setState({error}))
      .then(() => this.setState({loading: false}))
  }

  createPost = () => {
    this.props.history.push('/post/create')
  }

  editPost = (event, post) => {
    this.props.history.push(`/post/edit/${post.id}`)
  }

  deletePost = (event, post) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      this.setState({loading: true})
      BulletinService.deletePost(post.id)
        .then(() => this.loadBulletin())
        .catch(error => this.setState({error}))
        .then(() => this.setState({loading: false}))
    }
  }

  replyPost = () => {
    // Not implemented
  }

  renderPosts(posts) {
    return posts.map((post) => (
      <div className="Bulletin-post" key={post.id}>
        <Post
          post={post}
          onEdit={event => this.editPost(event, post)}
          onDelete={event => this.deletePost(event, post)}
          onReply={this.replyPost}
        />
      </div>
    ))
  }

  render() {
    return (
      <div className={`Bulletin ${ this.state.loading ? 'isLoading' : '' }`}>
        <header>
          <h2>
            <span>{this.state.bulletin.title}</span>
          </h2>
        </header>

        <button className="Bulletin-button Bulletin-button" onClick={this.createPost}>
          <span>Write Something</span>
        </button>

        {this.renderPosts(this.state.bulletin.posts)}

        <footer>

        </footer>
      </div>

    )
  }
}

export default Bulletin
