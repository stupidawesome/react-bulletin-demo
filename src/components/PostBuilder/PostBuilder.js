import React, {Component} from 'react';
import './PostBuilder.css';
import Input from '../Input/Input';
import FormControlModel from '../../models/FormControl.model';
import FormGroupModel from '../../models/FormGroup.model';
import BulletinService from '../../services/Bulletin.service';
import Post from '../../models/Post.model';

class PostBuilder extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      post: new Post(),
      form: new FormControlModel([
        new FormGroupModel('author', '', [FormControlModel.REQUIRED]),
        new FormGroupModel('title', '', [FormControlModel.REQUIRED]),
        new FormGroupModel('message', '', [FormControlModel.REQUIRED])
      ])
    }
  }

  componentWillMount () {
    if (this.props.match.params.postId) {
      this.loadPost(parseInt(this.props.match.params.postId, 10))
    }
  }

  savePost = (event) => {
    const {form, post} = this.state
    const {history} = this.props
    event.preventDefault()
    if (form.isValid()) {
      this.setState({loading: true})
      BulletinService
        .savePost(Post.create(Object.assign({}, post, form.getValue())))
        .then(() => {
          this.setState({loading: false})
        })
        .then(() => history.push('/'))
        .catch((error) => {
          this.setState({error})
        })
    }

    this.setState(prevState => prevState.form.setSubmitted(true))
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState((prevState) => {
      prevState.form.patchValue({
        [name]: value
      })
    })
  }

  loadPost (postId) {
    this.setState({loading: true})
    return BulletinService.findPostById(postId)
      .then((post) => {
        if (post) {
          this.setState((prevState) => {
            prevState.form.setValue(post)
            prevState.post = post
          })
        }
      })
      .then(() => {
        this.setState({loading: false})
      })
      .catch(() => {
        this.props.history.push('/post/create')
      })
  }

  render() {
    const form = this.state.form

    return (
      <form noValidate onSubmit={this.savePost}>
        <div className={`PostBuilder  ${this.state.loading ? 'isLoading' : ''}`}>
          <div className={`PostBuilder-formGroup`}>
            <label htmlFor={form.author.id}>Author</label>
            <Input className={`PostBuilder-input`} formGroup={form.author}>
              <input id={form.author.id} name={form.author.name} value={form.author.viewValue} placeholder={`Author`} onChange={this.handleInputChange} />
            </Input>
            <div className={`PostBuilder-status`} hidden={!form.author.dirty && form.author.invalid}>
              <span hidden={!form.author.errors.required}>Required</span>
            </div>
          </div>

          <div className={`PostBuilder-formGroup`}>
            <label htmlFor={form.title.id}>Title</label>
            <Input className={`PostBuilder-input`} formGroup={form.title}>
              <input id={form.title.id} name={form.title.name} value={form.title.viewValue} placeholder={`Title`} onChange={this.handleInputChange} />
            </Input>
            <div className={`PostBuilder-status`} hidden={!form.title.dirty && form.title.invalid}>
              <span hidden={!form.title.errors.required}>Required</span>
            </div>
          </div>

          <div className={`PostBuilder-formGroup`}>
            <label htmlFor={form.message.id}>Message</label>
            <Input className={`PostBuilder-input`} formGroup={form.message}>
              <textarea id={form.message.id} name={form.message.name} value={form.message.viewValue} placeholder={`Enter your message...`} onChange={this.handleInputChange} />
            </Input>
            <div className={`PostBuilder-status`} hidden={!form.message.dirty && form.message.invalid}>
              <span hidden={!form.message.errors.required}>Required</span>
            </div>
          </div>

          <button className={`PostBuilder-submit`}>
            <span>Post it</span>
          </button>
        </div>
      </form>
    );
  }
}

export default PostBuilder;
