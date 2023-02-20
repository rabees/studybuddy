import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { getPost, editPost } from '../../actions/postActions';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.getPost(postId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.post.post) {
      const { text } = nextProps.post.post;
      this.setState({ text });
      this.setState({ errors: {} });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    
    const updatedPost = {
      text: this.state.text
    };
    
    this.props.editPost(this.props.match.params.id, updatedPost, this.props.history);
    // this.setState({ errors: {} });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
      <NavBar/>
      <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="display-4 text-center">Edit Post</h2>
             
            <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Edit post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Update
              </button>
              <Link to={"/feed"} className="btn btn-light">
                Back
              </Link>
            </form>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
}

EditPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors
});

export default connect(mapStateToProps, { getPost, editPost })(EditPost);
