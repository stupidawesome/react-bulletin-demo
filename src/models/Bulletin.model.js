import PostModel from './Post.model'

export default class BulletinModel {
  constructor (title, posts) {
    this.title = title
    this.posts = (posts || []).map(PostModel.create)
  }
}
