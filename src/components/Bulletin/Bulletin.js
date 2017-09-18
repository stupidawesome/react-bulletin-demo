import React, { Component } from 'react'
import './Bulletin.css'
import Post from "../Post/Post"
import BulletinModel from "../../models/Bulletin.model";
import BulletinService from "../../services/Bulletin.service";

class Bulletin extends Component {

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

  filteredPosts () {
    return this.state.bulletin.posts.filter((post, index) => {
      return index < 10
    }).sort(function (a, b) {
      if (a.created < b.created) {
        return 1
      }
      if (a.created > b.created) {
        return -1
      }
      return 0
    })
  }

  loadBulletin = () => {
    this.setState({loading: true})
    return BulletinService.list()
      .then(bulletin => this.setState({bulletin}))
      .catch(error => this.setState({error}))
      .then(() => this.setState({loading: false}))
  }

  createPost = () => {

  }

  editPost = () => {

  }

  deletePost = () => {

  }

  replyPost = () => {

  }

  renderPosts(posts) {
    return posts.map((post) => {
      return <div className="Bulletin-post" key={post.id}>
        <Post
          post={post}
          onEdit={this.editPost}
          onDelete={this.deletePost}
          onReply={this.replyPost}
        />
      </div>
    })
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

        {this.renderPosts(this.filteredPosts())}

        <footer>

        </footer>
      </div>

    )
  }
}

export default Bulletin
